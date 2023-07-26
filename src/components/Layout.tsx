// components/Layout.tsx

import React, {ReactNode} from 'react';
import NavBar from './NavBar';
import {createTheme, ThemeProvider} from "@mui/material";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <NavBar />
            {children}
        </>
    );
};

export default Layout;
