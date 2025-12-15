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
}) => {
    const { width: screenWidth } = useWindowDimensions();
    const isSmallScreen = screenWidth < 375;

    const getTextSize = () => isSmallScreen ? 12 : 14;
    const getLegalTextSize = () => isSmallScreen ? 10 : 12;

    // Use new simplified API if provided, otherwise fall back to legacy API
    const displayText = text || toggleText || (mode === 'signin' ? "Don't have an account?" : 'Already have an account?');
    const displayLinkText = textLink || toggleLinkText || (mode === 'signin' ? 'Sign Up' : 'Sign In');
    const handleLinkPress = textLinkOnPress || onToggleMode;

    return (
        <View style={[styles.container, { marginTop: isSmallScreen ? 16 : 24 }, customStyles?.footer]}>
            {/* Toggle Mode / Custom Footer Text */}
            {handleLinkPress && (
                <View style={[styles.toggleContainer, { marginBottom: isSmallScreen ? 12 : 16 }]}>
                    <Text style={[
                        styles.text,
                        { fontSize: getTextSize() },
                        customStyles?.footerText,
                        textStyle,
                    ]}>
                        {displayText}{' '}
                    </Text>
                    <TouchableOpacity onPress={handleLinkPress}>
                        <Text style={[
                            styles.linkText,
                            { fontSize: getTextSize() },
                            customStyles?.footerLink,
                            textLinkStyle,
                        ]}>
                            {displayLinkText}
                        </Text>
                    </TouchableOpacity>
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
