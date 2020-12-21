export default {
	id: '1',
    direction: 'row',
	injected: null,
	selected: false,
	children: [{
		id: '1-1',
		type: 'magic',
		direction: 'row',
		injected: null,
		selected: false,
		children: [],
	}, {
		id: '1-2',
		type: 'magic',
		direction: 'column',
		injected: {
			type: 'tc-image',
			props: {
				imgSource: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3635794697,2478707107&fm=15&gp=0.jpg',
			},
		},
		selected: false,
		children: [],
	}]
};
