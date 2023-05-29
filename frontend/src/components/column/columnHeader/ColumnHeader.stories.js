import ColumnHeader from './ColumnHeader';

export default {
	title: 'ColumnHeader',
	component: ColumnHeader,
	tags: ['autodovcs'],
};

export const Primary = {
	args: {
		title: 'Бэклог',
	},
};

export const PrimaryFixed = {
	args: {
		title: 'В работе',
		fixed: true,
		quantity: 18
	},
};