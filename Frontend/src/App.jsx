import { ThemeProvider } from "styled-components";

import GlobalStyles from "./styles/GlobalStyles";
import Nav from './components/Navbar';
import { useTheme } from "./hooks/useTheme";
import Router from "./routes/index"; 
import { BrowserRouter } from "react-router-dom";

function App() {
  const { theme, handleThemeChange } = useTheme();

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Nav />
          <GlobalStyles />
          <Router/>
          <button onClick={handleThemeChange}>Trocar tema</button>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App
