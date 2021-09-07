import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type Theme = "light" | "dark";

type ThemeContextProps = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const useThemeContext = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error(
      "useThemeContext must be used inside a ThemeContext.Provider"
    );
  }
  return theme;
};

const ThemeProvider: React.FC<{ startingTheme: Theme }> = ({
  startingTheme,
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(startingTheme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={
          startingTheme === "light"
            ? "container-fluid light"
            : "container-fluid dark"
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
