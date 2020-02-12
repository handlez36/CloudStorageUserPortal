import { RESOLUTIONS } from './../services/config';

const CELL_UNIT_WIDTH = 8;
const COLUMN_CELL_UNITS = {
	[RESOLUTIONS.LOW]: 6,
	[RESOLUTIONS.MED]: 8,
	[RESOLUTIONS.HIGH]: 14,
	// 1024: 6,
	// 1440: 8,
	// 2560: 14,
};
const GUTTER_CELL_UNITS = {
	[RESOLUTIONS.LOW]: 2,
	[RESOLUTIONS.MED]: 4,
	[RESOLUTIONS.HIGH]: 6,
	// 1024: 2,
	// 1440: 4,
	// 2560: 6,
};
const SIDE_PADDING_CELL_UNITS = {
	[RESOLUTIONS.LOW]: 1,
	[RESOLUTIONS.MED]: 2,
	[RESOLUTIONS.HIGH]: 3,
	// 1024: 1,
	// 1440: 2,
	// 2560: 3,
};
const ROW_HEIGHT = {
	[RESOLUTIONS.LOW]: {
		2: 19,
		4: 38,
	},
	[RESOLUTIONS.MED]: {
		2: 27,
		4: 54,
	},
	[RESOLUTIONS.HIGH]: {
		2: 42,
		4: 84,
	},
	// 1024: {
	// 	2: 19,
	// 	4: 38,
	// },
	// 1440: {
	// 	2: 27,
	// 	4: 54,
	// },
	// 2560: {
	// 	2: 42,
	// 	4: 84,
	// },
};

export const DIMENSIONS = {
	TWO_BY_ONE: '2x1',
	TWO_BY_TWO: '2x2',
	TWO_BY_THREE: '2x3',
	TWO_BY_FOUR: '2x4',
	TWO_BY_SIX: '2x6',
	TWO_BY_EIGHT: '2x8',
	TWO_BY_TEN: '2x10',
	TWO_BY_TWELVE: '2x12',
	FOUR_BY_ONE: '4x1',
	FOUR_BY_TWO: '4x2',
	FOUR_BY_THREE: '4x3',
	FOUR_BY_FOUR: '4x4',
	FOUR_BY_SIX: '4x6',
	FOUR_BY_EIGHT: '4x8',
	FOUR_BY_TEN: '4x10',
};

export default class LayoutManager {
	constructor(breakpoint) {
		this.currentBreakpoint = breakpoint;
	}

	updateBreakpoint = breakpoint => {
		this.currentBreakpoint = breakpoint;
	};

	/**
	 * name - layout name for component; mapped to 'i'
	 * column - which column to position element on
	 * row - what row (8px row) to position element on
	 * dimensions - component dimensions (heightxwidth)
	 * customHeight - 2x12 components can have varying heights
	 */
	getGridLocation = (name, column, row, dimensions, customHeight = null) => {
		if (!name || column === null || row === null || !dimensions) {
			return null;
		}

		const { w, h } = this._parseDimensions(dimensions, customHeight);
		const x = this._getXCoordinate(column);
		const y = row;

		return {
			i: name,
			x,
			y,
			w,
			h,
			static: true,
		};
	};

	_getXCoordinate = column => {
		if (!column || !this.currentBreakpoint) {
			return null;
		}

		/** Select proper cell unit counts based on screen width width */
		const colCellUnits = COLUMN_CELL_UNITS[this.currentBreakpoint] || 8;
		const sitePaddingCellUnits = SIDE_PADDING_CELL_UNITS[this.currentBreakpoint] || 2;
		const gutterCellUnits = GUTTER_CELL_UNITS[this.currentBreakpoint] || 4;

		const colSpan = column - 1;
		return sitePaddingCellUnits + colSpan * colCellUnits + colSpan * gutterCellUnits;
	};

	_getComponentWidth = widthUnits => {
		const gutterCellUnits = GUTTER_CELL_UNITS[this.currentBreakpoint] || 4;
		const columnWidth = COLUMN_CELL_UNITS[this.currentBreakpoint];
		return columnWidth * widthUnits + gutterCellUnits * (widthUnits - 1);
	};

	_getComponentHeight = heightUnits => {
		return ROW_HEIGHT[this.currentBreakpoint][heightUnits];
	};

	_parseDimensions = (type, customHeight) => {
		const typeRegex = /(2|4)x(12|10|1|2|3|4|6|8)/;
		const [, height, width] = type.match(typeRegex);
		if (height && width) {
			const useCustomHeight = this._allowCustomHeight(width, height, customHeight);
			const widthPixels = this._getComponentWidth(width);
			const heightPixels = useCustomHeight ? customHeight : this._getComponentHeight(height);

			return { w: widthPixels, h: heightPixels };
		}

		return { w: null, h: null };
	};

	_allowCustomHeight = (width, height, customHeight) => {
		return width === '12' && height === '2' && customHeight;
	};
}
