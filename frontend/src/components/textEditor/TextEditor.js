import React from 'react';
import styled from 'styled-components';

import { Editor, EditorState, RichUtils } from 'draft-js';
// import { Editor1 } from 'draft-js';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import codeIcon from '../../assets/icons/textEditor/code.svg';
import TextEditorSelect from './TextEditorSelect';

const StyledTextEditor = styled.div`
	background: ${props => props.theme.colors.primary0};
	border: 1px solid ${props => props.theme.colors.primary20};

	h1 {font-size: 20px;}
	h2 {font-size: 20px;}
	h3 {font-size: 20px;}
	h4 {font-size: 20px;}
	h5 {font-size: 20px;}
	h6 {font-size: 20px;}
`;

const StyledTextEditorHead = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 8px 12px;
	border-bottom: 1px solid ${props => props.theme.colors.primary20};
`;

const StyledTextEditorIcon = styled.div`
	width: 14px;
	height: 14px;
	cursor: pointer;
`;

const StyledTextEditorIconImg = styled.img`
	width: 100%;
	height: 100%;
`;

const StyledTextEditorSelect = styled.div`

`;

const StyledTextEditorSelectList = styled.div`

`;

const StyledTextEditorSelectListItem = styled.div`

`;

const StyledTextEditorBody = styled.div`
	height: 260px;
	padding: 12px;
`;

const btnInlineStyle = [
	{ type: 'BOLD', icon: codeIcon },
	{ type: 'ITALIC', icon: codeIcon },
	{ type: 'UNDERLINE', icon: codeIcon },
	{ type: 'STRIKETHROUGH', icon: codeIcon },

	{ type: 'CODE', icon: codeIcon },
	{ type: 'LINEHEIGHT', icon: codeIcon },

	{ type: 'SUPERSCRIPT', icon: codeIcon },
	// { type: 'SUPERSCRIPT', icon: codeIcon },
];

const options = [
	{ label: 'Заголовок 1', style: 'header-one', value: 1 },
	{ label: 'Заголовок 6', style: 'header-six', value: 2 },
]

// { label: 'H1', style: 'header-one' },
// { label: 'H2', style: 'header-two' },
// { label: 'H3', style: 'header-three' },
// { label: 'H4', style: 'header-four' },
// { label: 'H5', style: 'header-five' },
// { label: 'H6', style: 'header-six' },

const TextEditor = () => {
	const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty());

	const onChange = editorState => setEditorState(editorState);

	const handleChangeInlineStyle = (type) => {
		onChange(RichUtils.toggleInlineStyle(editorState, type));
	}

	const toggleBlockType = (blockType) => {
		onChange(RichUtils.toggleBlockType(editorState, blockType.style))
	}

	const toggleInlineStyle = (style) => {
		const newState = RichUtils.toggleInlineStyle(editorState, style);
		setEditorState(newState);
	};

	const styles = [
		{ type: 'BOLD', label: 'B' },
		{ type: 'ITALIC', label: 'I' },
		{ type: 'UNDERLINE', label: 'U' },
		{ type: 'STRIKETHROUGH', label: 'S' },
		{ type: 'CODE', label: 'Co' },
		{ type: 'SUPERSCRIPT', label: 'Su' },
	];

	const styleMap = {
		SUPERSCRIPT: {
			fontSize: '0.8em',
			position: 'relative',
			top: '-0.5em',
		},
	};

	return (
		<StyledTextEditor>
			<StyledTextEditorHead>
				{/* <TextEditorSelect
					defaultValue={options[0]}
					options={options}
					// onChange={toggleBlockType}
				/> */}
				{btnInlineStyle.map(({ type, icon }) =>
					<StyledTextEditorIcon
						onClick={() => handleChangeInlineStyle(type)}
					>
						<StyledTextEditorIconImg
							src={icon}
							alt={type.toLocaleLowerCase()}
						/>
					</StyledTextEditorIcon>
				)}
			</StyledTextEditorHead>
			<StyledTextEditorBody>
				<Editor
					editorState={editorState}
					onChange={setEditorState}
					customStyleMap={styleMap}
				// toolbar={{
				// 	inline: {
				// 		options: ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript'],
				// 	},
				// }}
				/>
			</StyledTextEditorBody>
		</StyledTextEditor>
		// <StyledTextEditor>
		// 	<StyledTextEditorHead>
		// 		{styles.map(({ type, label }) => (
		// 			<StyledTextEditorIcon onClick={() => toggleInlineStyle(type)}>
		// 				{label}
		// 			</StyledTextEditorIcon>
		// 		))}
		// 	</StyledTextEditorHead>
		// 	<StyledTextEditorBody>
		// 		<Editor
		// 			editorState={editorState}
		// 			onChange={setEditorState}
		// 			customStyleMap={styleMap}
		// 		/>
		// 	</StyledTextEditorBody>
		// </StyledTextEditor>
	);
};

export default TextEditor;