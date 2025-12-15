import { ReactNode } from 'react';
import { TextStyle, ViewStyle, TextInputProps } from 'react-native';
import { Theme } from '../theme';
import { Translations } from '../i18n';

// ============================================================================
// Form Data Types
// ============================================================================

export interface AuthFormData {
    email: string;
    password: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    username?: string;
    rememberMe?: boolean;
    acceptTerms?: boolean;
}

export type AuthMode = 'signin' | 'signup';

export type ValidationType =
    | 'formik-yup'
    | 'rhf-yup'
    | 'rhf-zod';

// ============================================================================
// Social Login Types
// ============================================================================

export type SocialProvider = 'google' | 'apple' | 'facebook' | 'twitter' | 'github';

export interface SocialLoginConfig {
    provider: SocialProvider;
    onPress: () => void | Promise<void>;
    disabled?: boolean;
    iconComponent?: ReactNode;
    label?: string;
}

// ============================================================================
// Biometric Types
// ============================================================================

export interface BiometricConfig {
    enabled: boolean;
    type?: 'fingerprint' | 'faceId' | 'both';
    onAuthenticate: () => void | Promise<void>;
    promptMessage?: string;
}

// ============================================================================
// Field Configuration
// ============================================================================

export interface FieldConfig {
    name: keyof AuthFormData;
    label?: string;
    placeholder?: string;
    required?: boolean;
    visible?: boolean;
    inputProps?: Partial<TextInputProps>;
}

export interface FieldsConfig {
    email?: Partial<FieldConfig>;
    password?: Partial<FieldConfig>;
    confirmPassword?: Partial<FieldConfig>;
    firstName?: Partial<FieldConfig>;
    lastName?: Partial<FieldConfig>;
    phone?: Partial<PhoneFieldConfig>;
    username?: Partial<FieldConfig>;
}

// ============================================================================
// Country Code Picker Types
// ============================================================================

export interface CountryData {
    code: string;
    name: string;
    dialCode: string;
    flag?: string;
}

export interface CountryPickerConfig {
    enabled: boolean;
    defaultCountry?: string;
    customComponent?: (props: {
        selectedCountry: CountryData;
        onSelect: (country: CountryData) => void;
        visible: boolean;
        onClose: () => void;
    }) => ReactNode;
    styles?: {
        container?: ViewStyle;
        button?: ViewStyle;
        buttonText?: TextStyle;
        modalContainer?: ViewStyle;
        listItem?: ViewStyle;
        listItemText?: TextStyle;
    };
}

export interface PhoneFieldConfig extends Omit<FieldConfig, 'name'> {
    name?: 'phone';
    countryPicker?: CountryPickerConfig;
}

// ============================================================================
// Submit Button Types
// ============================================================================

export interface SubmitButtonConfig {
    component?: (props: {
        onPress: () => void;
        isLoading: boolean;
        disabled?: boolean;
        title: string;
    }) => ReactNode;
    text?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabledStyle?: ViewStyle;
}

// ============================================================================
// Forgot Password Types
// ============================================================================

export interface ForgotPasswordConfig {
    /** Enable/disable forgot password link */
    enabled?: boolean;
    /** Custom text for the link */
    text?: string;
    /** Called when the link is pressed */
    onPress?: () => void;
    /** Container style */
    style?: ViewStyle;
    /** Text style */
    textStyle?: TextStyle;
}

// ============================================================================
// Checkbox Configuration Types
// ============================================================================

export interface CheckboxStyleConfig {
    /** Container style for the entire checkbox row */
    containerStyle?: ViewStyle;
    /** Style for the checkbox box itself */
    checkboxStyle?: ViewStyle;
    /** Style for the checkbox when checked */
    checkboxCheckedStyle?: ViewStyle;
    /** Color for the checkmark icon */
    checkmarkColor?: string;
    /** Style for the label text */
    labelStyle?: TextStyle;
    /** Style for the link text (e.g., "Terms & Conditions") */
    linkStyle?: TextStyle;
}

export interface RememberMeConfig extends CheckboxStyleConfig {
    /** Enable/disable the checkbox */
    enabled?: boolean;
    /** Custom label text */
    label?: string;
}

export interface AcceptTermsConfig extends CheckboxStyleConfig {
    /** Enable/disable the checkbox */
    enabled?: boolean;
    /** Custom label text (before the link) */
    label?: string;
    /** Link text (e.g., "Terms & Conditions") */
    linkText?: string;
    /** Called when the link is pressed */
    onLinkPress?: () => void;
}

// ============================================================================
// Style Props
// ============================================================================

export interface AuthFormStyles {
    container?: ViewStyle;
    header?: ViewStyle;
    headerTitle?: TextStyle;
    headerSubtitle?: TextStyle;
    logoContainer?: ViewStyle;
    body?: ViewStyle;
    inputContainer?: ViewStyle;
    input?: TextStyle;
    inputLabel?: TextStyle;
    inputError?: TextStyle;
    /** Style applied to input wrapper when focused */
    inputFocused?: ViewStyle;
    /** Style applied to input wrapper when blurred (default state) */
    inputBlurred?: ViewStyle;
    button?: ViewStyle;
    buttonText?: TextStyle;
    buttonDisabled?: ViewStyle;
    footer?: ViewStyle;
    footerText?: TextStyle;
    footerLink?: TextStyle;
    socialButtonsContainer?: ViewStyle;
    socialButton?: ViewStyle;
    divider?: ViewStyle;
    dividerText?: TextStyle;
}

// ============================================================================
// Component Props
// ============================================================================

export interface LogoConfig {
    source: ReactNode;
    size?: number;
    width?: number;
    height?: number;
    style?: ViewStyle;
}

export interface HeaderProps {
    title?: string;
    subtitle?: string;
    logo?: ReactNode | LogoConfig;
    styles?: Pick<AuthFormStyles, 'header' | 'headerTitle' | 'headerSubtitle' | 'logoContainer'>;
}

export interface FooterProps {
    mode: AuthMode;
    onToggleMode?: () => void;
    toggleText?: string;
    toggleLinkText?: string;
    forgotPasswordText?: string;
    onForgotPassword?: () => void;
    termsText?: string;
    privacyText?: string;
    onTermsPress?: () => void;
    onPrivacyPress?: () => void;
    styles?: Pick<AuthFormStyles, 'footer' | 'footerText' | 'footerLink'>;
    // New simplified API
    text?: string;
    textLink?: string;
    textLinkOnPress?: () => void;
    textStyle?: TextStyle;
    textLinkStyle?: TextStyle;
}

export interface InputProps {
    name: string;
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    onBlur?: () => void;
    error?: string;
    touched?: boolean;
    secureTextEntry?: boolean;
    keyboardType?: TextInputProps['keyboardType'];
    autoCapitalize?: TextInputProps['autoCapitalize'];
    autoComplete?: TextInputProps['autoComplete'];
    styles?: Pick<AuthFormStyles, 'inputContainer' | 'input' | 'inputLabel' | 'inputError' | 'inputFocused' | 'inputBlurred'>;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    disabled?: boolean;
}

export interface SocialButtonProps {
    provider: SocialProvider;
    onPress: () => void | Promise<void>;
    disabled?: boolean;
    iconComponent?: ReactNode;
    label?: string;
    style?: ViewStyle;
}

// ============================================================================
// Main AuthForm Props
// ============================================================================

export interface AuthFormProps {
    mode: AuthMode;
    validationType: ValidationType;
    onSubmit: (data: AuthFormData) => void | Promise<void>;
    onModeChange?: (mode: AuthMode) => void;
    header?: {
        title?: string;
        subtitle?: string;
        logo?: ReactNode | LogoConfig;
    };
    footer?: Partial<Omit<FooterProps, 'mode'>>;
    fields?: FieldsConfig;
    socialLogins?: SocialLoginConfig[];
    biometric?: BiometricConfig;
    styles?: AuthFormStyles;
    isLoading?: boolean;
    submitButtonText?: string;
    /** @deprecated Use rememberMe.enabled instead */
    showRememberMe?: boolean;
    /** @deprecated Use acceptTerms.enabled instead */
    showAcceptTerms?: boolean;
    /** Remember Me checkbox configuration */
    rememberMe?: RememberMeConfig;
    /** Accept Terms checkbox configuration */
    acceptTerms?: AcceptTermsConfig;
    customValidationSchema?: unknown;
    apiError?: string;
    initialValues?: Partial<AuthFormData>;
    /** @deprecated Use forgotPassword.onPress instead */
    onForgotPassword?: () => void;
    /** Forgot password link configuration */
    forgotPassword?: ForgotPasswordConfig;
    submitButton?: SubmitButtonConfig;
    /** Custom theme (overrides ThemeProvider context) */
    theme?: Theme;
    /** Custom translations (overrides I18nProvider context) */
    translations?: Translations;
}

// ============================================================================
// Form Strategy Props (Internal)
// ============================================================================

export interface FormStrategyProps {
    mode: AuthMode;
    onSubmit: (data: AuthFormData) => void | Promise<void>;
    /** @deprecated Use forgotPassword instead */
    onForgotPassword?: () => void;
    /** Forgot password configuration */
    forgotPassword?: ForgotPasswordConfig;
    fields?: FieldsConfig;
    styles?: AuthFormStyles;
    isLoading?: boolean;
    submitButtonText?: string;
    showRememberMe?: boolean;
    showAcceptTerms?: boolean;
    /** Remember Me checkbox configuration */
    rememberMe?: RememberMeConfig;
    /** Accept Terms checkbox configuration */
    acceptTerms?: AcceptTermsConfig;
    customValidationSchema?: unknown;
    apiError?: string;
    initialValues?: Partial<AuthFormData>;
    submitButton?: SubmitButtonConfig;
}
