const BaseColors = require('../models/baseColors');

const createDefaultBaseColor = async () => {
	const defaultBaseColor = await BaseColors.findOne({ where: { id: 1 } });
	if (!defaultBaseColor) {
		await BaseColors.create({
			id: 1,
			name: 'default',
			primary: '#313652',
			secondary: '#8bd688',
			info: '#ff884d',
			danger: '#ff884d',
			warning: '#ffd600',
			succsess: '#0bd688',
			neutral: '#656a85',
		});
	}
}

module.exports = createDefaultBaseColor;