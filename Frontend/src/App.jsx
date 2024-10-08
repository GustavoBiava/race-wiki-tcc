import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Nav from './components/Navbar';
import { useTheme } from "./hooks/useTheme";
import Router from "./routes/index"; 

function App() {
  const { theme, handleThemeChange } = useTheme();

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Nav />
          <Router />
          <button onClick={handleThemeChange}>Trocar tema</button>
          <GlobalStyles />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App
