export const _formattingBaseColors = (colors) => {
	return {
		primary: colors?.primary || '#454A67',
		secondary: colors?.secondary || '#454A67',
		info: colors?.info || '#454A67',
		danger: colors?.danger || '#454A67',
		warning: colors?.warning || '#454A67',
		succsess: colors?.succsess || '#454A67',
		neutral: colors?.neutral || '#454A67',
	}
}

export const _formattingBoardData = (boardData) => {
	const formattingBoardData = {};
	boardData.forEach((item) => {
		formattingBoardData[`${item.name}`] = {
			...item,
			tasks: item.tasks.map((item) => ({ ...item, id: `${item.id}` }))
		};
	})
	return formattingBoardData;
}

export const _formattingDate = (date) => {
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear() % 100;
	return (day < 10 ? '0' : '') + day + '.' +
		(month < 10 ? '0' : '') + month + '.' +
		(year < 10 ? '0' : '') + year;
}