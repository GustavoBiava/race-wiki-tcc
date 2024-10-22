import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store';
import GlobalStyles from "./styles/GlobalStyles";
import Nav from './components/Navbar';
import { useTheme } from "./hooks/useTheme";
import Routes from "./routes/index"; 

function App() {
  const { theme, handleThemeChange } = useTheme();

  return (
    <>
    <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ThemeProvider theme={theme}>
              <Nav />
              <Routes />
              <button onClick={handleThemeChange}>Trocar tema</button>
              <GlobalStyles />
              <ToastContainer theme='dark' pauseOnHover draggable/>
            </ThemeProvider>
          </PersistGate>
        </Provider>
    </BrowserRouter>
      
    </>
  );
}

export default App
