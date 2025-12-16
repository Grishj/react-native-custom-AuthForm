import React, { useState, useMemo } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { AuthFormProps, AuthMode, LogoConfig } from '../types';
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
    iconSource,
    appLogo,
}) => {
    const [mode, setMode] = useState<AuthMode>(initialMode);
    const theme = useTheme();
    const { t } = useTranslation();

    const handleModeChange = () => {
        const newMode = mode === 'signin' ? 'signup' : 'signin';
        setMode(newMode);
        onModeChange?.(newMode);
    };

    // Filter social logins to only enabled ones
    const activeSocialLogins = socialLogins?.filter(login => !login.disabled) || [];

    const StrategyComponent = validationType === 'formik-yup' ? FormikForm : RHFForm;

    // Check if we have a valid logo config
    const hasLogo = !!appLogo;
    const hasLegacyLogo = !!header?.logo;

    const renderAppLogo = () => {
        // Prioritize appLogo prop
        if (hasLogo) {
            // Config object
            if (typeof appLogo === 'object' && 'source' in (appLogo as LogoConfig) && !React.isValidElement(appLogo)) {
                const logoConfig = appLogo as LogoConfig;
                return (
                    <View style={[styles.logoContainer, styles.appLogoContainer, logoConfig.style]}>
                        {React.isValidElement(logoConfig.source) ? (
                            logoConfig.source
                        ) : (
                            <Image
                                source={logoConfig.source as any}
                                style={{
                                    width: logoConfig.width || 120,
                                    height: logoConfig.height || 120,
                                    resizeMode: 'contain'
                                }}
                            />
                        )}
                    </View>
                );
            }
            // Direct component/node
            return (
                <View style={[styles.logoContainer, styles.appLogoContainer]}>
                    {appLogo as React.ReactNode}
                </View>
            );
        }
        return null;
    };

    // Merge forgotPassword config
    const forgotPasswordConfig = forgotPassword || (onForgotPassword ? { enabled: true, onPress: onForgotPassword } : undefined);

    const effectiveShowRememberMe = rememberMe?.enabled ?? showRememberMe;
    const effectiveShowAcceptTerms = acceptTerms?.enabled ?? showAcceptTerms;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={[styles.keyboardAvoid, customStyles?.container]}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                {/* Independent App Logo */}
                {renderAppLogo()}

                <Header
                    title={header?.title || (mode === 'signin' ? t('welcomeBack') : t('createAccount'))}
                    subtitle={header?.subtitle || (mode === 'signin' ? t('signInToContinue') : t('signUpToGetStarted'))}
                    logo={!hasLogo && hasLegacyLogo ? header?.logo : undefined}
                    styles={customStyles}
                    titleStyle={header?.titleStyle}
                    subtitleStyle={header?.subtitleStyle}
                    style={header?.style}
                />

                <StrategyComponent
                    mode={mode}
                    onSubmit={onSubmit}
                    forgotPassword={{
                        enabled: mode === 'signin',
                        onPress: onForgotPassword,
                        ...forgotPasswordConfig,
                    }}
                    fields={fields}
                    styles={customStyles}
                    isLoading={isLoading}
                    submitButtonText={submitButtonText}
                    submitButton={submitButton}
                    showRememberMe={effectiveShowRememberMe}
                    showAcceptTerms={effectiveShowAcceptTerms}
                    rememberMe={rememberMe}
                    acceptTerms={acceptTerms}
                    customValidationSchema={customValidationSchema}
                    apiError={apiError}
                    initialValues={initialValues}
                    resolverType={validationType === 'rhf-zod' ? 'zod' : 'yup'}
                    iconSource={iconSource}
                />

                {(biometric?.enabled) && (
                    <View style={[styles.biometricContainer, customStyles?.biometricButton]}>
                        <BiometricButton
                            config={biometric}
                            textStyle={customStyles?.biometricText}
                            iconStyle={customStyles?.biometricIcon}
                            iconSource={iconSource}
                        />
                    </View>
                )}

                {activeSocialLogins.length > 0 && (
                    <View style={[styles.socialContainer, customStyles?.socialButtonsContainer]}>
                        <SocialLoginGroup
                            providers={activeSocialLogins.map(login => ({
                                provider: login.provider,
                                onPress: login.onPress,
                                disabled: login.disabled || isLoading,
                                iconSource: login.iconSource || iconSource,
                                label: login.label,
                                icon: login.icon,
                                iconPosition: login.iconPosition,
                                iconStyle: login.iconStyle || customStyles?.socialButtonIcon,
                                textStyle: login.textStyle || customStyles?.socialButtonText,
                                style: styles.socialButton
                            }))}
                            dividerStyle={customStyles?.divider}
                            dividerTextStyle={customStyles?.dividerText}
                        />
                    </View>
                )}

                <Footer
                    mode={mode}
                    onToggleMode={onModeChange ? handleModeChange : undefined}
                    toggleText={footer?.toggleText}
                    toggleLinkText={footer?.toggleLinkText}
                    forgotPasswordText={footer?.forgotPasswordText}
                    onForgotPassword={footer?.onForgotPassword}
                    termsText={footer?.termsText}
                    privacyText={footer?.privacyText}
                    onTermsPress={footer?.onTermsPress}
                    onPrivacyPress={footer?.onPrivacyPress}
                    styles={customStyles}
                    text={footer?.text}
                    textLink={footer?.textLink}
                    textLinkOnPress={footer?.textLinkOnPress}
                    textStyle={footer?.textStyle}
                    textLinkStyle={footer?.textLinkStyle}
                    style={footer?.style}
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
    logoContainer: {
        alignItems: 'center',
        marginBottom: 24,
        // No horizontal padding by default to allow full width
    },
    appLogoContainer: {
        width: '100%',
    },
    centered: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContent: {
        flexGrow: 1,
    },
    socialButton: {
        flex: 1,
    },
});

export default AuthForm;
