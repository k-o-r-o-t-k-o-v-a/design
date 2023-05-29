import { createGlobalStyle } from 'styled-components';

import MontserratFont from './../assets/fonts/Montserrat-Regular.ttf';

const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Montserrat';
    src: url(${MontserratFont});
    font-display: swap;
  }

* {
	padding: 0px;
	margin: 0px;
	border: 0px;
}

*,
*:before,
*:after {
	-moz-box-sizing: border-box;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
}

:focus,
:active {
	outline: none;
}

a:focus,
a:active {
	outline: none;
}

aside,
nav,
footer,
header,
section {
	display: block;
}

html,
body {
	/* height: 110%; */
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}

body {
	line-height: normal;
	font-family: 'Montserrat';
	-ms-text-size-adjust: 100%;
	-moz-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
}

input,
button,
textarea {
	font-family: 'Montserrat';
}

input::-ms-clear {
	display: none;
}

button {
	cursor: pointer;
}

button::-moz-focus-inner {
	padding: 0;
	border: 0;
}

a,
a:visited {
	text-decoration: none;
}

a:hover {
	text-decoration: none;
}

ul li {
	list-style: none;
}

img {
	vertical-align: top;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-weight: inherit;
	font-size: inherit;
}
`;

export default GlobalStyle;