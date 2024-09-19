import React from 'react';
import storage from 'local-storage-fallback';

export const useTheme = () => {
  const initialTheme = storage.getItem('theme');
  const [theme, setTheme] = React.useState(JSON.parse(initialTheme) || { mode: 'light' });

  React.useEffect(() => {
    storage.setItem('theme', JSON.stringify(theme));
  }, [theme]);

  const handleThemeChange = () => setTheme(theme.mode === 'dark' ? { mode: 'light' } : { mode: 'dark' });

  return {
    theme,
    handleThemeChange,
  }
}