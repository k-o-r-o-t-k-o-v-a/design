import Button from './Button';
import icon from './../../../assets/storybook/plus.svg';

export default {
	title: 'Button',
	component: Button,
	tags: ['autodocs'],
};

export const Primary = {
	name: 'Primary Label',
	args: {
		variant: 'primary',
		label: 'Cоздать',
	},
};

export const PrimaryLabelIcon = {
	args: {
		variant: 'primary',
		label: 'Cоздать',
		icon,
	},
};

export const PrimaryIcon = {
	args: {
		variant: 'primary',
		icon,
	},
};