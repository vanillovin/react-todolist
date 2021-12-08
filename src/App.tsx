import { createGlobalStyle } from 'styled-components';
import styled, { ThemeProvider } from 'styled-components';
import ToDoList from './components/ToDoList';
import { darkTheme, lightTheme } from './theme';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom } from './atoms';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
  font-family: 'Noto Sans KR', sans-serif;
  margin-top: 100px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  line-height: 1.2;
  font-weight: 300;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
* {
  box-sizing: border-box;
}
a {
  color: inherit;
  text-decoration: none;
}
`;
const Toggle = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  border: 0;
  cursor: pointer;
  background-color: transparent;
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <Toggle onClick={toggleDarkAtom}>{isDark ? '🌞' : '🌝'}</Toggle>
        <GlobalStyle />
        <ToDoList />
      </ThemeProvider>
    </>
  );
}

export default App;
