// Main component export
export { AuthForm } from './components/AuthForm';
export { ForgotPasswordForm } from './components/ForgotPasswordForm';

// UI Components (for advanced customization)
export { Header } from './ui/Header';
export { Footer } from './ui/Footer';
export { Input } from './ui/Input';
export { PhoneInput } from './ui/PhoneInput';
export { CountryCodePicker, getCountryByCode, COUNTRIES } from './ui/CountryCodePicker';
export { SocialButton, SocialLoginGroup } from './ui/SocialButton';
export { SubmitButton } from './ui/SubmitButton';
export { Checkbox } from './ui/Checkbox';

// Form strategies (for direct use if needed)
export { FormikForm } from './components/strategies/FormikForm';
export { RHFForm } from './components/strategies/RHFForm';

// Validation schemas (for custom extension)
export {
    getYupSchema,
    getYupSignInSchema,
    getYupSignUpSchema,
    getZodSchema,
    zodSignInSchema,
    zodSignUpSchema,
} from './utils/validationSchemas';

// Theme system
export {
    defaultLightTheme,
    defaultDarkTheme,
    createTheme,
} from './theme';
export type {
    Theme,
    ThemeColors,
    ThemeTypography,
    ThemeSpacing,
    ThemeBorderRadius,
} from './theme';

// i18n (Internationalization) system
export {
    defaultEnTranslations,
    createTranslations,
} from './i18n';
export type {
    Translations,
    PartialTranslations,
} from './i18n';

// Context providers and hooks
export {
    ThemeProvider,
    useTheme,
    I18nProvider,
    useTranslation,
    AuthFormProvider,
} from './context';
export type {
    ThemeProviderProps,
    I18nProviderProps,
    AuthFormProviderProps,
} from './context';

// Types
export type {
    AuthFormProps,
    AuthFormData,
    AuthMode,
    ValidationType,
    AuthFormStyles,
    HeaderProps,
    FooterProps,
    InputProps,
    FieldConfig,
    FieldsConfig,
    SocialLoginConfig,
    SocialProvider,
    BiometricConfig,
    SocialButtonProps,
    FormStrategyProps,
    LogoConfig,
    CountryData,
    CountryPickerConfig,
    PhoneFieldConfig,
    SubmitButtonConfig,
    ForgotPasswordConfig,
    CheckboxStyleConfig,
    RememberMeConfig,
    AcceptTermsConfig,
} from './types';
