import { ThemeProvider } from "styled-components";

import GlobalStyles from "./styles/GlobalStyles";
import Nav from './components/Navbar';
import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme, handleThemeChange } = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <Nav />
        <GlobalStyles />
        <button onClick={handleThemeChange}>Trocar tema</button>
      </ThemeProvider>
    </>
  );
}

export default App
