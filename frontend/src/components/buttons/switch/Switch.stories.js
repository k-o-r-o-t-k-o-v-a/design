import Switch from './Switch';
import menu01 from './../../../assets/storybook/menu01.svg';
import menu02 from './../../../assets/storybook/menu02.svg';

export default {
	title: 'ButtonSwitch',
	component: Switch,
	tags: ['autodocs'],
};

export const Primary = {
	name: 'Primary Text',
	args: {
		variant: 'text',
		labels: ['Список', 'Доска'],
	},
};

export const PrimaryIcon = {
	args: {
		variant: 'icon',
		icons: [menu01, menu02],
	},
};