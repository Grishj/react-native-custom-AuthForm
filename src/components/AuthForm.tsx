import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthFormProps, AuthMode } from '../types';
import { Header, Footer, SocialLoginGroup, BiometricButton } from '../ui';
import { FormikForm } from './strategies/FormikForm';
import { RHFForm } from './strategies/RHFForm';
import { ThemeProvider, I18nProvider, useTheme, useTranslation } from '../context';

// Inner component that uses theme and translations
const AuthFormContent: React.FC<Omit<AuthFormProps, 'theme' | 'translations'>> = ({
    mode: initialMode,
    validationType,
    onSubmit,
    onModeChange,
    header,
    footer,
    fields,
    socialLogins,
    biometric,
    styles: customStyles,
    isLoading = false,
    submitButtonText,
    showRememberMe = true,
    showAcceptTerms = true,
    rememberMe,
    acceptTerms,
    customValidationSchema,
    apiError,
    initialValues,
    onForgotPassword,
    forgotPassword,
    submitButton,
}) => {
    const [mode, setMode] = useState<AuthMode>(initialMode);
    const theme = useTheme();
    const { t } = useTranslation();

    const handleModeChange = () => {
        const newMode = mode === 'signin' ? 'signup' : 'signin';
        setMode(newMode);
        onModeChange?.(newMode);
    };

    const renderForm = () => {
        // Merge forgotPassword config with legacy onForgotPassword for backward compatibility
        const forgotPasswordConfig = forgotPassword || (onForgotPassword ? { enabled: true, onPress: onForgotPassword } : undefined);

        // Support both new config objects and legacy boolean props
        const effectiveShowRememberMe = rememberMe?.enabled ?? showRememberMe;
        const effectiveShowAcceptTerms = acceptTerms?.enabled ?? showAcceptTerms;

        const commonProps = {
            mode,
            onSubmit,
            forgotPassword: forgotPasswordConfig,
            fields,
            styles: customStyles,
            isLoading,
            submitButtonText,
            showRememberMe: effectiveShowRememberMe,
            showAcceptTerms: effectiveShowAcceptTerms,
            rememberMe,
            acceptTerms,
            customValidationSchema,
            apiError,
            initialValues,
            submitButton,
        };

        switch (validationType) {
            case 'formik-yup':
                return <FormikForm {...commonProps} />;
            case 'rhf-yup':
                return <RHFForm {...commonProps} resolverType="yup" />;
            case 'rhf-zod':
                return <RHFForm {...commonProps} resolverType="zod" />;
            default:
                return <FormikForm {...commonProps} />;
        }
    };

    const socialButtonProps = socialLogins?.map((config) => ({
        provider: config.provider,
        onPress: config.onPress,
        disabled: config.disabled,
        iconComponent: config.iconComponent,
        label: config.label,
    }));

    // Use theme colors for default background if no custom style
    const containerBackground = customStyles?.container?.backgroundColor ?? theme.colors.background;

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoid}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={[styles.scrollView, { backgroundColor: containerBackground }]}
                contentContainerStyle={[styles.container, customStyles?.container]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {header && (
                    <Header
                        title={header.title || (mode === 'signin' ? t('welcomeBack') : t('createAccount'))}
                        subtitle={header.subtitle || (mode === 'signin'
                            ? t('signIn')
                            : t('getStarted')
                        )}
                        logo={header.logo}
                        styles={customStyles}
                    />
                )}

                {renderForm()}

                {mode === 'signin' && biometric?.enabled && (
                    <View style={styles.biometricContainer}>
                        <BiometricButton config={biometric} />
                    </View>
                )}

                {socialButtonProps && socialButtonProps.length > 0 && (
                    <View style={styles.socialContainer}>
                        <SocialLoginGroup
                            providers={socialButtonProps}
                            containerStyle={customStyles?.socialButtonsContainer}
                        />
                    </View>
                )}

                <Footer
                    mode={mode}
                    onToggleMode={onModeChange ? handleModeChange : undefined}
                    toggleText={footer?.toggleText || (mode === 'signin' ? t('dontHaveAccount') : t('alreadyHaveAccount'))}
                    toggleLinkText={footer?.toggleLinkText || (mode === 'signin' ? t('signUp') : t('signIn'))}
                    forgotPasswordText={footer?.forgotPasswordText}
                    onForgotPassword={footer?.onForgotPassword}
                    termsText={footer?.termsText}
                    privacyText={footer?.privacyText}
                    onTermsPress={footer?.onTermsPress}
                    onPrivacyPress={footer?.onPrivacyPress}
                    styles={customStyles}
                    // New simplified API props
                    text={footer?.text}
                    textLink={footer?.textLink}
                    textLinkOnPress={footer?.textLinkOnPress}
                    textStyle={footer?.textStyle}
                    textLinkStyle={footer?.textLinkStyle}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

// Main AuthForm component that wraps with providers when needed
export const AuthForm: React.FC<AuthFormProps> = ({
    theme,
    translations,
    ...props
}) => {
    // Wrap with providers if theme or translations are provided
    let content = <AuthFormContent {...props} />;

    // Wrap with I18nProvider if translations provided
    if (translations) {
        content = <I18nProvider translations={translations}>{content}</I18nProvider>;
    }

    // Wrap with ThemeProvider if theme provided
    if (theme) {
        content = <ThemeProvider theme={theme}>{content}</ThemeProvider>;
    }

    return content;
};

const styles = StyleSheet.create({
    keyboardAvoid: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        paddingVertical: 40,
    },
    biometricContainer: {
        paddingHorizontal: 20,
        marginTop: 16,
    },
    socialContainer: {
        paddingHorizontal: 20,
    },
});

export default AuthForm;
