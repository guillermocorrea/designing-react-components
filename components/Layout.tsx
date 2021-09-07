import React from "react";
import { Theme, useThemeContext } from "../context/ThemeContext";
import ThemeProvider from "../context/ThemeContext";

const Layout: React.FC<{ startingTheme: Theme }> = ({
  startingTheme,
  children,
}) => {
  return (
    <ThemeProvider startingTheme={startingTheme}>
      <LayoutNoThemeProvider>{children}</LayoutNoThemeProvider>
    </ThemeProvider>
  );
};

const LayoutNoThemeProvider: React.FC = ({ children }) => {
  const { theme } = useThemeContext();
  return <div className={`container-fluid ${theme}`}>{children}</div>;
};

export default Layout;
