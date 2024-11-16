import React, { createContext } from "react";
import storage from 'local-storage-fallback';

export const ThemeContext = createContext(ThemeProvider);

// eslint-disable-next-line react/prop-types
function ThemeProvider({ children }) { 

    const initialTheme = storage.getItem('theme');
    const [theme, setTheme] = React.useState(JSON.parse(initialTheme) || { mode: 'light' });
  
    React.useEffect(() => {
      storage.setItem('theme', JSON.stringify(theme));
    }, [theme]);
  
    const handleThemeChange = () => setTheme(theme.mode === 'dark' ? { mode: 'light' } : { mode: 'dark' });

    return(
        <ThemeContext.Provider value={{ theme, handleThemeChange  }}>
            { children }
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;