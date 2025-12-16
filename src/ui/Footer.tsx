import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { FooterProps } from '../types';

export const Footer: React.FC<FooterProps> = ({
    mode,
    onToggleMode,
    toggleText,
    toggleLinkText,
    forgotPasswordText = 'Forgot Password?',
    onForgotPassword,
    termsText = 'Terms of Service',
    privacyText = 'Privacy Policy',
    onTermsPress,
    onPrivacyPress,
    styles: customStyles,
    // New simplified API
    text,
    textLink,
    textLinkOnPress,
    textStyle,
    textLinkStyle,
    style,
    enabled = true,
}) => {
    if (enabled === false) return null;

    const { width: screenWidth } = useWindowDimensions();
    const isSmallScreen = screenWidth < 375;

    const getTextSize = () => isSmallScreen ? 12 : 14;
    const getLegalTextSize = () => isSmallScreen ? 10 : 12;

    // Use new simplified API if provided, otherwise fall back to legacy API
    const resolvedText = text || toggleText;
    const resolvedLinkText = textLink || toggleLinkText;
    const handleLinkPress = textLinkOnPress || onToggleMode;

    // Only use defaults if we verify we are in a standard toggle mode scenario (action exists)
    // or if neither specific text/link was provided (legacy behavior fallbacks)
    // USER REQUEST: Footer should be opt-in only. No auto-defaults.
    const showDefaults = false;

    const finalDisplayText = showDefaults
        ? (mode === 'signin' ? "Don't have an account?" : 'Already have an account?')
        : (resolvedText || '');

    const finalLinkText = showDefaults
        ? (mode === 'signin' ? "Sign Up" : "Sign In")
        : (resolvedLinkText || '');

    const hasContent = !!finalDisplayText || !!finalLinkText;

    return (
        <View style={[styles.container, { marginTop: isSmallScreen ? 16 : 24 }, customStyles?.footer, style]}>
            {/* Toggle Mode / Custom Footer Text */}
            {hasContent && (
                <View style={[styles.toggleContainer, { marginBottom: isSmallScreen ? 12 : 16 }]}>
                    {!!finalDisplayText && (
                        <Text style={[
                            styles.text,
                            { fontSize: getTextSize() },
                            customStyles?.footerText,
                            textStyle,
                        ]}>
                            {finalDisplayText}{' '}
                        </Text>
                    )}

                    {!!finalLinkText && (
                        handleLinkPress ? (
                            <TouchableOpacity onPress={handleLinkPress}>
                                <Text style={[
                                    styles.linkText,
                                    { fontSize: getTextSize() },
                                    customStyles?.footerLink,
                                    textLinkStyle,
                                ]}>
                                    {finalLinkText}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <Text style={[
                                styles.linkText,
                                { fontSize: getTextSize() },
                                customStyles?.footerLink,
                                textLinkStyle,
                            ]}>
                                {finalLinkText}
                            </Text>
                        )
                    )}
                </View>
            )}

            {/* Terms and Privacy Links */}
            {(onTermsPress || onPrivacyPress) && (
                <View style={styles.legalContainer}>
                    {onTermsPress && (
                        <TouchableOpacity onPress={onTermsPress}>
                            <Text style={[styles.legalText, { fontSize: getLegalTextSize() }, customStyles?.footerLink]}>
                                {termsText}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {onTermsPress && onPrivacyPress && (
                        <Text style={[styles.legalSeparator, { fontSize: getLegalTextSize() }]}> • </Text>
                    )}
                    {onPrivacyPress && (
                        <TouchableOpacity onPress={onPrivacyPress}>
                            <Text style={[styles.legalText, { fontSize: getLegalTextSize() }, customStyles?.footerLink]}>
                                {privacyText}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 24,
        paddingHorizontal: 20,
    },
    toggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 16,
    },
    text: {
        fontSize: 14,
        color: '#6b7280',
    },
    linkText: {
        fontSize: 14,
        color: '#6366f1',
        fontWeight: '600',
    },
    legalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    legalText: {
        fontSize: 12,
        color: '#9ca3af',
    },
    legalSeparator: {
        color: '#9ca3af',
        fontSize: 12,
    },
});

export default Footer;
