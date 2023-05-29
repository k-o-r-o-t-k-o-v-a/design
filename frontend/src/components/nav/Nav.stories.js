import Nav from './Nav';
import { navLinks } from './links';

export default {
	title: 'Nav',
	component: Nav,
	tags: ['autodocs'],
};

export const Primary = {
	args: {
		navLinks,
	},
};