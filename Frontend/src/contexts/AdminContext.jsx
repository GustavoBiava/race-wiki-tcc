import React, { createContext } from "react";

export const AdminContext = createContext(AdminProvider);

// eslint-disable-next-line react/prop-types
function AdminProvider({ children }) { 

    const [mode, setMode] = React.useState('admin');
    
    const setAdmin = () => setMode('admin');
    const unsetAdmin = () => setMode('normal');

    return(
        <AdminContext.Provider value={{ mode, setAdmin, unsetAdmin  }}>
            { children }
        </AdminContext.Provider>
    );
}

export default AdminProvider;