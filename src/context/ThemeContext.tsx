import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { Theme, defaultLightTheme } from '../theme';

// ============================================================================
// Theme Context
// ============================================================================

interface ThemeContextValue {
    theme: Theme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ============================================================================
// Theme Provider Props
// ============================================================================

export interface ThemeProviderProps {
    /** Custom theme to use */
    theme?: Theme;
    /** Children components */
    children: ReactNode;
}

// ============================================================================
// Theme Provider Component
// ============================================================================

/**
 * ThemeProvider provides theme context to all child components.
 * If no theme is provided, defaults to the light theme.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    theme = defaultLightTheme,
    children,
}) => {
    const value = useMemo(() => ({ theme }), [theme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

// ============================================================================
// useTheme Hook
// ============================================================================

/**
 * Hook to access the current theme.
 * Returns the default light theme if used outside ThemeProvider.
 */
export const useTheme = (): Theme => {
    const context = useContext(ThemeContext);

    // Return default theme if used outside provider (for backward compatibility)
    if (!context) {
        return defaultLightTheme;
    }

    return context.theme;
};

export default ThemeProvider;
