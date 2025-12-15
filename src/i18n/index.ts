// ============================================================================
// Translations Interface
// ============================================================================

export interface Translations {
    // Auth modes
    signIn: string;
    signUp: string;
    createAccount: string;
    welcomeBack: string;
    getStarted: string;

    // Field labels
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    phone: string;
    phoneNumber: string;
    username: string;

    // Placeholders
    emailPlaceholder: string;
    passwordPlaceholder: string;
    confirmPasswordPlaceholder: string;
    firstNamePlaceholder: string;
    lastNamePlaceholder: string;
    phonePlaceholder: string;
    usernamePlaceholder: string;

    // Buttons
    signInButton: string;
    signUpButton: string;
    submitButton: string;
    continueButton: string;

    // Forgot password
    forgotPassword: string;
    sendResetLink: string;
    resetPassword: string;
    backToSignIn: string;
    rememberYourPassword: string;

    // Checkboxes
    rememberMe: string;
    keepMeSignedIn: string;
    acceptTerms: string;
    iAgreeToThe: string;
    termsAndConditions: string;
    privacyPolicy: string;
    and: string;

    // Social login
    continueWith: string;
    orContinueWith: string;
    or: string;

    // Footer
    dontHaveAccount: string;
    alreadyHaveAccount: string;

    // Biometric
    authenticateWithBiometrics: string;
    useFingerprint: string;
    useFaceId: string;

    // Validation messages
    emailRequired: string;
    emailInvalid: string;
    passwordRequired: string;
    passwordTooShort: string;
    passwordMustMatch: string;
    firstNameRequired: string;
    lastNameRequired: string;
    phoneRequired: string;
    phoneInvalid: string;
    usernameRequired: string;
    usernameTooShort: string;
    acceptTermsRequired: string;

    // Country picker
    selectCountry: string;
    searchCountry: string;

    // Misc
    loading: string;
    success: string;
    error: string;
}

// ============================================================================
// Default English Translations
// ============================================================================

export const defaultEnTranslations: Translations = {
    // Auth modes
    signIn: 'Sign In',
    signUp: 'Sign Up',
    createAccount: 'Create Account',
    welcomeBack: 'Welcome Back',
    getStarted: 'Get Started',

    // Field labels
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone',
    phoneNumber: 'Phone Number',
    username: 'Username',

    // Placeholders
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    confirmPasswordPlaceholder: 'Confirm your password',
    firstNamePlaceholder: 'Enter your first name',
    lastNamePlaceholder: 'Enter your last name',
    phonePlaceholder: 'Enter your phone number',
    usernamePlaceholder: 'Choose a username',

    // Buttons
    signInButton: 'Sign In',
    signUpButton: 'Sign Up',
    submitButton: 'Submit',
    continueButton: 'Continue',

    // Forgot password
    forgotPassword: 'Forgot Password?',
    sendResetLink: 'Send Reset Link',
    resetPassword: 'Reset Password',
    backToSignIn: 'Back to Sign In',
    rememberYourPassword: 'Remember your password?',

    // Checkboxes
    rememberMe: 'Remember me',
    keepMeSignedIn: 'Keep me signed in',
    acceptTerms: 'Accept Terms',
    iAgreeToThe: 'I agree to the',
    termsAndConditions: 'Terms & Conditions',
    privacyPolicy: 'Privacy Policy',
    and: 'and',

    // Social login
    continueWith: 'Continue with',
    orContinueWith: 'Or continue with',
    or: 'or',

    // Footer
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',

    // Biometric
    authenticateWithBiometrics: 'Authenticate with biometrics',
    useFingerprint: 'Use Fingerprint',
    useFaceId: 'Use Face ID',

    // Validation messages
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    passwordRequired: 'Password is required',
    passwordTooShort: 'Password must be at least 8 characters',
    passwordMustMatch: 'Passwords must match',
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    phoneRequired: 'Phone number is required',
    phoneInvalid: 'Please enter a valid phone number',
    usernameRequired: 'Username is required',
    usernameTooShort: 'Username must be at least 3 characters',
    acceptTermsRequired: 'You must accept the terms and conditions',

    // Country picker
    selectCountry: 'Select Country',
    searchCountry: 'Search country...',

    // Misc
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
};

// ============================================================================
// Translation Creation Helper
// ============================================================================

export type PartialTranslations = Partial<Translations>;

/**
 * Create custom translations by merging with English defaults.
 * Only provide the translations you want to override.
 * @param overrides - Partial translations object
 * @returns Complete translations object
 */
export const createTranslations = (overrides: PartialTranslations): Translations => {
    return {
        ...defaultEnTranslations,
        ...overrides,
    };
};
