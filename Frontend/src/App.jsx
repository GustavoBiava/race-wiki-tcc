import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useContext } from "react";

import store, { persistor } from './store';
import GlobalStyles from "./styles/GlobalStyles";
import Nav from './components/Navbar';
import Routes from "./routes/index"; 
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
  
  const { theme } = useContext(ThemeContext);

  return (
    <>
    <BrowserRouter>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ThemeProvider theme={theme}>
                <Nav />
                <Routes />
                <GlobalStyles />
                <ToastContainer theme='dark' draggable limit={3}/>
            </ThemeProvider>
          </PersistGate>
        </Provider>
    </BrowserRouter>
      
    </>
  );
}

export default App;
