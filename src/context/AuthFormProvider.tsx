import React, { ReactNode } from 'react';
import { ThemeProvider, ThemeProviderProps } from './ThemeContext';
import { I18nProvider, I18nProviderProps } from './I18nContext';
import { Theme } from '../theme';
import { Translations } from '../i18n';

// ============================================================================
// Combined Provider Props
// ============================================================================

export interface AuthFormProviderProps {
    /** Custom theme */
    theme?: Theme;
    /** Custom translations */
    translations?: Translations;
    /** Children components */
    children: ReactNode;
}

// ============================================================================
// AuthFormProvider Component
// ============================================================================

/**
 * Combined provider for theming and i18n.
 * Use this at the app root level for consistent theming across all AuthForm instances.
 * 
 * @example
 * ```tsx
 * import { AuthFormProvider, defaultDarkTheme, spanishTranslations } from 'react-native-custom-form';
 * 
 * function App() {
 *   return (
 *     <AuthFormProvider theme={defaultDarkTheme} translations={spanishTranslations}>
 *       <YourApp />
 *     </AuthFormProvider>
 *   );
 * }
 * ```
 */
export const AuthFormProvider: React.FC<AuthFormProviderProps> = ({
    theme,
    translations,
    children,
}) => {
    return (
        <ThemeProvider theme={theme}>
            <I18nProvider translations={translations}>
                {children}
            </I18nProvider>
        </ThemeProvider>
    );
};

export default AuthFormProvider;
