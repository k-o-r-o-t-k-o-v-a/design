import styled from "styled-components";

const StyledWrapperInput = styled.div`
	margin: 0 0 20px;
`

const StyledWrapperSection = styled.section`
	margin: 32px;
`

const StyledForm = styled.form`
		margin: 32px 0 0;
`

const StyledRowBtn = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
`

const StyledErrorWrapper = styled.div`
	margin-top: ${props => props.top ? '20px' : 0};
	margin-bottom: 20px;
`

export {
	StyledWrapperInput,
	StyledWrapperSection,
	StyledForm,
	StyledRowBtn,
	StyledErrorWrapper
};