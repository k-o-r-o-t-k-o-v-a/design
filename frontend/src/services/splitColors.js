const hexToRgb = (hex) => {
	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);
	return [r, g, b];
}

const rgbToHex = (r, g, b) => {
	const hexR = r.toString(16).padStart(2, "0");
	const hexG = g.toString(16).padStart(2, "0");
	const hexB = b.toString(16).padStart(2, "0");
	return `#${hexR}${hexG}${hexB}`;
}

const lightenByTenth = ([r, g, b], x) => {
	const newR = Math.round(r + Math.min((255 - r), (255 - r) * x));
	const newG = Math.round(g + Math.min((255 - g), (255 - g) * x));
	const newB = Math.round(b + Math.min((255 - b), (255 - b) * x));
	return rgbToHex(newR, newG, newB);
}

const darkenByTenth = ([r, g, b], x) => {
	const newR = Math.round(r - r * x);
	const newG = Math.round(g - g * x);
	const newB = Math.round(b - b * x);
	return rgbToHex(newR, newG, newB);
}

export const splittingColors = (colors) => {
	const splitColors = {};
	for (const key in colors) {
		const baseRGB = hexToRgb(colors[key]);
		splitColors[`${key}${0}`] = '#ffffff';
		splitColors[`${key}${10}`] = lightenByTenth(baseRGB, 0.835);
		splitColors[`${key}${20}`] = lightenByTenth(baseRGB, 0.666);
		splitColors[`${key}${30}`] = lightenByTenth(baseRGB, 0.502);
		splitColors[`${key}${40}`] = lightenByTenth(baseRGB, 0.333);
		splitColors[`${key}${50}`] = lightenByTenth(baseRGB, 0.168);
		splitColors[`${key}${60}`] = colors[key];
		splitColors[`${key}${70}`] = darkenByTenth(baseRGB, 0.250);
		splitColors[`${key}${80}`] = darkenByTenth(baseRGB, 0.500);
		splitColors[`${key}${90}`] = darkenByTenth(baseRGB, 0.750);
		splitColors[`${key}${100}`] = '#000000';
	}
	return splitColors;
}