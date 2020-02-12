import React, { Component } from 'react';
import { PaperScope, paper, Point, Segment, Path } from 'paper';

const USER_NAME_LOCATION_1280 = new Point(68, 7);
const PWD_LOCATION_1280 = new Point(99, 7);
const MFA_LOCATION_1280 = new Point(132, 7);
const CURVE_ANIMATION_SPEED = 10;

var activityindicators = [];

class Canvas extends Component {
	constructor(props) {
		super(props);

		window['canvas'] = new PaperScope();

		// this.circle;
		// var indicator1 = new Path.Circle([purpleCurveStart.point.x, purpleCurveStart.point.y],4);
		// this.circle.strokeColor = 'white';

		this.state = {
			line_to_move: null,
			target_x: null,
			target_y: null,
			original_x: null,
			original_y: null,
			direction: null,
			enableMovement: false,
			enableRequestAnimation: false,
			enableResponseAnimation: false,
			responseComplete: false,
		};
	}

	setupCurvedLines(movableSegment = new Segment([USER_NAME_LOCATION_1280.x, 90])) {
		var maxScreenWidth = paper.view.size.width;

		var commonCurvestyles = {
			strokeWidth: 1,
			shadowBlur: 10,
		};

		// Purple curve
		var line1 = new Path();
		line1.add(
			new Segment([0, 100]),
			// new Segment( [USER_NAME_LOCATION_1280.x, 90] ),
			movableSegment,
			new Segment([300, 75]),
			new Segment([(maxScreenWidth / 3) * 2, 115]),
			new Segment([maxScreenWidth, 80]),
		);
		line1.strokeColor = '#2d063d';
		line1.shadowColor = '#fff';
		line1.style = commonCurvestyles;
		line1.smooth();

		this.setState({
			original_x: line1.segments[1].point.x,
			original_y: line1.segments[1].point.y,
		});

		// Red curve
		var line2 = new Path();
		line2.add(
			new Segment([0, 80]),
			new Segment([300, 125]),
			new Segment([(maxScreenWidth / 3) * 2, 50]),
			new Segment([maxScreenWidth, 100]),
		);
		line2.strokeColor = '#ef3a04';
		line2.shadowColor = '#ef3a04';
		line2.style = commonCurvestyles;
		line2.smooth();

		return [line1, line2];
	}

	setCircles = () => {
		var userIndicatorBoundingRect = document
			.querySelector(`#${this.props.firstIndicator}`)
			.getBoundingClientRect();
		var canvasBoundingRect = document.querySelector('canvas').getBoundingClientRect();
		var maxCanvasWidth = paper.view.size.width;
		var offset = 5;

		let canvasOffset = userIndicatorBoundingRect.x - canvasBoundingRect.x + offset;
		let ratio = canvasOffset / maxCanvasWidth;

		// this.circle.position = new Point(maxCanvasWidth * ratio, 5);
		// this.circle.position.x = maxCanvasWidth * ratio;
		return maxCanvasWidth * ratio;
	};

	setMoveableCurveSegment = (indicatorPosition, curves) => {
		let curve = curves[0];
		let segmentPositionY = curve.getPointAt(indicatorPosition).y;

		curve.removeSegment(1);
		curve.insert(1, new Segment([indicatorPosition, segmentPositionY]));
		curve.smooth();
	};

	setupBackgroundActivityIndicator() {
		var maxScreenWidth = paper.view.size.width;
		var purpleCurveStart = new Segment([0, 100]);
		var redCurveStart = new Segment([0, 80]);

		// Circle indicator for purple curve
		var indicator1 = new Path.Circle([purpleCurveStart.point.x, purpleCurveStart.point.y], 4);
		indicator1.strokeColor = '#2d063d';
		indicator1.fillColor = '#2d063d';
		indicator1.opacity = 0;

		// Circle indicator for red curve
		var indicator2 = new Path.Circle([maxScreenWidth, 100], 4);
		indicator2.strokeColor = '#ef3a04';
		indicator2.fillColor = '#ef3a04';
		indicator2.opacity = 0;

		return [indicator1, indicator2];
	}

	componentDidMount() {
		var instance;
		// if (this.props.axios) {
		//     instance = this.props.axios;
		//     instance.interceptors.request.use( (config) => {
		//         // console.log("HTTP request going out...")
		//         this.setState({ enableRequestAnimation: true, enableResponseAnimation: false });

		//         return config;
		//     })

		//     instance.interceptors.response.use( (config) => {
		//         // console.log("HTTP response coming in...")
		//         this.setState({ enableRequestAnimation: false, enableResponseAnimation: true });

		//         return config;
		//     })
		// }

		// Paper JS setup to HTML5 canvas
		var canvas = document.getElementById('canvas');
		paper.setup(canvas);

		// this.circle = new Path.Circle([0,0],4);
		// this.circle.strokeColor = 'white';

		// Get references to curve and activity indicator instances
		// Save curves to component state
		activityindicators = this.setupBackgroundActivityIndicator();
		var curves = this.setupCurvedLines();
		this.setState({ curves: curves });

		// console.log('BEFORE - Curve 1 segments: ', curves[0].segments);
		this.setMoveableCurveSegment(this.setCircles(), curves);
		// window.onresize = () => {
		//     console.log('Resizing');
		//    this.setMoveableCurveSegment( this.setCircles(), curves );
		// }

		// Activity indicator progress controls
		var pct = 0;
		var step = 0;
		var interval = 0.1; // Indicator speed
		var pct2 = 0;
		var step2 = 0;
		var activeIndicator;

		/**
		 *
		 * @param event
		 * Set up main animation loop
		 */
		paper.view.onFrame = event => {
			curves.forEach((curve, index) => {
				activeIndicator = index === 0 ? activityindicators[0] : activityindicators[1];

				for (var i = 1; i < curve.segments.length - 1; i++) {
					// Control wave oscilation
					// Don't move the anchor point used for authentication indicator animation
					if (!(index === 0 && i === 1) && this.state.enableMovement) {
						this.oscillateWave(curve, event.count, i);
					}

					// Control small circle movement across curve for request and response indicators
					if (this.state.enableRequestAnimation) {
						activityindicators[0].opacity = 1;
						activityindicators[1].opacity = 0;
						step = (step + interval) % 100;
						pct = (step / 100) * curves[0].length;
						activityindicators[0].position = curves[0].getPointAt(pct);
					} else if (this.state.enableResponseAnimation) {
						activityindicators[0].opacity = 0;
						activityindicators[1].opacity = 1;
						step2 = (step2 + interval) % 100;
						pct2 = curves[1].length - (step2 / 100) * curves[1].length;
						activityindicators[1].position = curves[1].getPointAt(pct2);

						if (pct2 < 100) {
							this.setState({ responseComplete: true });
							// this.checkAuthenticationStatus(this.props.response);
						}
					}

					// Control curve to authentication indicator animation
					this.animateCurveToAuthenticationIndicator(curve);
				}
			});
		};
	}

	componentWillUnmount() {
		// Need to clear timeout
	}

	UNSAFE_componentWillMount() {}

	UNSAFE_componentWillReceiveProps(newProps) {
		if (newProps.status) {
			this.checkAuthenticationStatus(newProps.status);
		}
	}

	checkAuthenticationStatus(response) {
		var status = response.status; // i.e. USERNAME_SUCCESS
		var context = response.current_context; // i.e. USERNAME

		var error_status = null;
		if (response.errorDetails) {
			error_status = response.errorDetails;
		}

		if (status.includes('SUCCESS') || status.includes('ERROR')) {
			this.handleAuthenticationStatusChange(context);
		}
	}

	handleAuthenticationStatusChange(context) {
		var indicatorCoordinates = this.getIndicatorCoordinates(context);

		this.updateAuthenticationIndicator(indicatorCoordinates);
	}

	getIndicatorCoordinates(current_context) {
		// TODO: Update to handle any contexts; Canvas either needs to be a generic component
		// adaptable to different contexts or two separate components
		switch (current_context) {
			case 'USERNAME':
				return USER_NAME_LOCATION_1280;
			case 'PASSWORD':
				return PWD_LOCATION_1280;
			case 'MFA':
				return MFA_LOCATION_1280;
			default:
				return null;
		}
	}

	/**
	 * Oscillate curve slightly up and down
	 * @param curve
	 * @param eventCount
	 * @param curveSegmentIndex
	 *
	 */
	oscillateWave(curve, eventCount, curveSegmentIndex) {
		var segment = curve.segments[curveSegmentIndex];
		var cosSeed = eventCount + (curveSegmentIndex * 5 + (curveSegmentIndex % 100)) * 180;
		var handleDirection = -1 * Math.cos(cosSeed / 100);
		var handleLength = Math.random() * 0.1;

		segment.point.y += Math.cos(cosSeed / 100) / 13;

		// Control segment handle movement
		// segment.handleIn    = segment.handleIn.add( new Point(0,handleDirection*handleLength) );
		// segment.handleOut   = segment.handleOut.add( new Point(0,-1*handleDirection*handleLength) );
	}

	/**
	 * Control movement of curve to authenitcator indicators under login icons
	 * @param curve
	 */
	animateCurveToAuthenticationIndicator(curve) {
		if (this.moveCurveToTarget(curve)) {
			var targetVector = new Point(
				this.state.target_x - curve.segments[1].point.x,
				this.state.target_y - curve.segments[1].point.y,
			);
			var vector_iteration = new Point(
				targetVector.x / CURVE_ANIMATION_SPEED,
				targetVector.y / CURVE_ANIMATION_SPEED,
			);

			curve.segments[1].point.x += vector_iteration.x;
			curve.segments[1].point.y += vector_iteration.y;
			// curve.segments[0].point.y += vector_iteration.y / 2;
			// line.segments[1].handleIn.y += vector_iteration.y / 10;
			// line.segments[1].handleOut.y -= vector_iteration.y / 10;

			for (var i = 0; i < curve.segments.length; i++) {
				if (i === 0 || i === 1 || i === curve.segments.length - 1) continue;

				curve.segments[i].point.y += vector_iteration.y / 3.5;
			}
		}
	}

	/**
	 * Determine whether curve should move up, down or stop based on current position and target
	 * @param line
	 */
	moveCurveToTarget(line) {
		var line_to_move = this.state.line_to_move;
		var target_x = this.state.target_x;
		var target_y = this.state.target_y;

		if (line_to_move && target_x && target_y && line === line_to_move) {
			if (this.notWithinRangeOfTarget(line_to_move.segments[1], target_x, target_y)) {
				return true;
			} else if (this.state.direction != 'down') {
				setTimeout(() => {
					this.setState({
						line_to_move: line,
						target_x: this.state.original_x,
						target_y: this.state.original_y,
						direction: 'down',
					});
				}, 500);
				return true;
			} else {
				this.setState({
					line_to_move: null,
					target_x: null,
					target_y: null,
					direction: 'up',
				});
			}
		}

		return false;
	}

	/**
	 * Check whether curve is within close range of target authentication indicator
	 * @param segment
	 * @param target_x
	 * @param target_y
	 */
	notWithinRangeOfTarget(segment, target_x, target_y) {
		const closeRange = 0.01;

		return (
			(segment.point.x - target_x < -1 * closeRange || segment.point.x - target_x > closeRange) &&
			(segment.point.y - target_y < -1 * closeRange || segment.point.y - target_y > closeRange)
		);
	}

	/**
	 * Set state for curve animation to target authentication indicator
	 * @param indicator
	 */
	updateAuthenticationIndicator(indicator) {
		var curves = this.state.curves;
		var curve1 = curves[0];

		this.setState({
			line_to_move: curve1,
			target_x: indicator.x - 10,
			target_y: indicator.y,
			direction: 'up',
		});
	}

	onEnableNaturalMovement() {
		this.setState({
			enableMovement: !this.state.enableMovement,
		});
	}

	onEnableActivityAnimation(indictor) {
		var newState = !this.state.enableActivityAnimation;

		this.setState({
			enableActivityAnimation: newState,
		});

		// Reset indicators
		if (!newState) {
			activityindicators[0].opacity = 0;
			activityindicators[1].opacity = 0;
		}
	}

	render() {
		return (
			<div>
				<canvas id='canvas' />
				<div className='row'>
					<div className='controls col-md-2'>
						<button
							onClick={() => {
								this.onEnableNaturalMovement();
							}}
							className='btn btn-primary btn-sm'
						>
							natural movement
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Canvas;
