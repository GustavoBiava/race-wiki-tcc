import React, { createContext } from "react";

export const AdminContext = createContext(AdminProvider);

// eslint-disable-next-line react/prop-types
function AdminProvider({ children }) { 

    const [mode, setMode] = React.useState('admin');
    
    const handleModeChange = () => setMode(mode === 'normal' ? 'admin' : 'normal' );

    return(
        <AdminContext.Provider value={{ mode, handleModeChange  }}>
            { children }
        </AdminContext.Provider>
    );
}

export default AdminProvider;