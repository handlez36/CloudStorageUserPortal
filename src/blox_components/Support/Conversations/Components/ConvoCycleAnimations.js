export const animateConvoCycle = (
	items,
	params,
	direction,
	itemClass = '.comment',
	containerClass = '.conversation-body',
	canMoveUpCallback,
	canMoveDownCallback,
) => {
	const topConvo = document.querySelector(itemClass);
	const allConvos = document.querySelectorAll(itemClass);
	const bottomConvo = allConvos[allConvos.length - 1];

	const container = document.querySelector(containerClass);
	const containerBox = container.getBoundingClientRect();
	const footer = document.querySelector('.footerContainer');
	const footerTop = footer.getBoundingClientRect().top;

	if (topConvo === null || topConvo === undefined) {
		return;
	}

	return direction === 'next'
		? convoTranslateDown(
				containerBox,
				footerTop,
				allConvos,
				topConvo,
				bottomConvo,
				containerClass,
				itemClass,
				canMoveUpCallback,
				canMoveDownCallback,
		  )
		: convoTranslateUp(
				containerBox,
				footerTop,
				allConvos,
				topConvo,
				bottomConvo,
				containerClass,
				itemClass,
				canMoveUpCallback,
				canMoveDownCallback,
		  );
};

export const updateArrowVisibility = (
	canMoveUpCallback,
	canMoveDownCallback,
	itemClass,
	containerClass,
) => {
	setTimeout(() => {
		try {
			const topConvo = document.querySelector(itemClass);
			const topConvoBox = topConvo.getBoundingClientRect();
			const allConvos = document.querySelectorAll(itemClass);
			const bottomConvo = allConvos[allConvos.length - 1];
			const bottomConvoBox = bottomConvo.getBoundingClientRect();
			const container = document.querySelector(containerClass);
			const containerBox = container.getBoundingClientRect();
			const footer = document.querySelector('.footerContainer');
			const footerTop = footer.getBoundingClientRect().top;

			if (Math.floor(topConvoBox.top) >= Math.floor(containerBox.top)) {
				canMoveUpCallback(false);
			} else {
				canMoveUpCallback(true);
			}
			if (bottomConvoBox.bottom < footerTop) {
				canMoveDownCallback(false);
				return null;
			} else {
				canMoveDownCallback(true);
			}
		} catch (e) {}
	}, 500);
};

function convoTranslateUp(
	containerBox,
	footerTop,
	convos,
	topConvo,
	bottomConvo,
	containerClass = '.conversation-body',
	itemClass,
	canMoveUpCallback,
	canMoveDownCallback,
) {
	let height = Math.min(containerBox.height / convos.length, 400);
	const topConvoBox = topConvo.getBoundingClientRect();

	// Check if top of container has been reached. Add 10px of padding.
	if (topConvoBox.top + height >= containerBox.top) {
		height = containerBox.top - topConvoBox.top + 10;
	}

	convos = Array.from(convos);
	convos.forEach(convo => {
		let transform = 0;
		if (convo.style.transform.includes('translateY(')) {
			transform = parseInt(convo.style.transform.split('translateY(')[1].replace(')', ''));
		}
		let finalTransform = transform + height;
		finalTransform = Math.abs(finalTransform) < 1 ? 0 : finalTransform;
		convo.setAttribute(
			'style',
			`   -webkit-transition: transform 0.4s ease; transform: translateY(${finalTransform}px);
                -ms-transition: transform 0.4s ease; transform: translateY(${finalTransform}px);
                transition: transform 0.4s ease; transform: translateY(${finalTransform}px);
            `,
		);
	});
	updateArrowVisibility(canMoveUpCallback, canMoveDownCallback, itemClass, containerClass);
}

function convoTranslateDown(
	containerBox,
	footerTop,
	convos,
	topConvo,
	bottomConvo,
	containerClass = '.conversation-body',
	itemClass,
	canMoveUpCallback,
	canMoveDownCallback,
) {
	const height = Math.min(containerBox.height / convos.length, 400);
	convos = Array.from(convos);
	convos.forEach(convo => {
		let transform = 0;
		if (convo.style.transform.includes('translateY(')) {
			transform = parseFloat(convo.style.transform.split('translateY(')[1].replace(')', ''));
		}
		const finalTransform = transform - height;

		convo.setAttribute(
			'style',
			`-webkit-transition: transform 0.4s ease; -webkit-transform: translateY(${finalTransform}px);
             -ms-transition: transform 0.4s ease; -ms-transform: translateY(${finalTransform}px); 
             transition: transform 0.4s ease; transform: translateY(${finalTransform}px);
            `,
		);
	});
	updateArrowVisibility(canMoveUpCallback, canMoveDownCallback, itemClass, containerClass);
}
