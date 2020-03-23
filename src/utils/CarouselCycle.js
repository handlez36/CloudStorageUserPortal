export const CarouselCycle = (
	items,
	params,
	direction,
	itemClass = '.comment',
	containerClass = '.conversation-body',
	callback,
) => {
	const leftConvo = document.querySelector(itemClass);
	const allConvos = document.querySelectorAll(itemClass);
	const rightConvo = allConvos[allConvos.length - 1];

	direction === 'next'
		? convoTranslateRight(allConvos, leftConvo, containerClass, callback)
		: convoTranslateLeft(allConvos, leftConvo, rightConvo, containerClass, callback);
};

function convoTranslateLeft(
	convos,
	topConvo,
	bottomConvo,
	listContainer = '.conversation-body',
	callback,
) {
	const convoContainer = document.querySelector(listContainer);
	const height = bottomConvo.getBoundingClientRect().height;

	convoContainer.removeChild(bottomConvo);
	convoContainer.insertBefore(bottomConvo, topConvo);

	convos = Array.from(convos);
	convos.forEach(convo => {
		const translateHeight = convo === bottomConvo ? height + 10 : height;

		convo.setAttribute(
			'style',
			`   -webkit-transition: none; transform: translateX(-${translateHeight}px);
                -ms-transition: none; transform: translateX(-${translateHeight}px);
                transition: none; transform: translateX(-${translateHeight}px);
            `,
		);
	});

	const interval = setInterval(() => {
		convos.forEach(convo => {
			convo.setAttribute(
				'style',
				`   -webkit-transition: transform 0.5s linear; -webkit-transform: translateY(${0}px);
                    -ms-transition: transform 0.5s linear; -ms-transform: translateY(${0}px); 
                    transition: transform 0.5s linear; transform: translateY(${0}px)
                `,
			);
		});

		clearInterval(interval);
		callback();
	}, 5);
}

function convoTranslateRight(convos, topConvo, containerClass = '.conversation-body', callback) {
	const convoContainer = document.querySelector(containerClass);
	const height = topConvo.getBoundingClientRect().height;

	convos = Array.from(convos);
	convos.forEach(convo => {
		convo.setAttribute(
			'style',
			`-webkit-transition: transform 0.5s linear; -webkit-transform: translateX(-${height + 5}px);
             -ms-transition: transform 0.5s linear; -ms-transform: translateX(-${height + 5}px); 
             transition: transform 0.5s linear; transform: translateX(-${height + 5}px);
            `,
		);
	});

	const interval = setInterval(() => {
		convoContainer.removeChild(topConvo);
		convoContainer.appendChild(topConvo);

		convoStyleReset(convos);

		clearInterval(interval);
		callback();
	}, 300);
}

function convoStyleReset(convos) {
	convos = Array.from(convos);
	convos.forEach(convo => {
		convo.setAttribute(
			'style',
			`-webkit-transition: none; -webkit-transform: translateX(${0}px);
             -ms-transition: none; -ms-transform: translateX(${0}px);
             transition: none; transform: translateX(${0}px)
            `,
		);
	});
}
