import Radio from './Radio';

export default {
	title: 'Radio',
	component: Radio,
	tags: ['autodocs'],
};

export const Primary = {
	args: {
		checked: true,
		onChange: () => { }
	},
};

export const PrimaryOff = {
	args: {
		checked: false,
		onChange: () => { }
	},
};

