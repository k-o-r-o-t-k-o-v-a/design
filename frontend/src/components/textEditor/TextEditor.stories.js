import TextEditor from './TextEditor';

export default {
	title: 'TextEditor',
	component: TextEditor,
	tags: ['autodocs'],
};

const options = [
	{ label: 'Опция 1', value: 1 },
	{ label: 'Опция 2', value: 2 },
	{ label: 'Опция 3', value: 3 },
	{ label: 'Опция 4', value: 4 },
	{ label: 'Опция 5', value: 5 },
	{ label: 'Опция 6', value: 6 },
	{ label: 'Опция 7', value: 7 },
	{ label: 'Опция 8', value: 8 },
]


export const Primary = {
	args: {
		defaultValue: {
			label: 'Соритровать',
			value: 0
		},
		options,
	}
}