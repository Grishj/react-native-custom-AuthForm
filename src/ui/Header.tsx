import React, { isValidElement } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, ViewStyle } from 'react-native';
import { HeaderProps, LogoConfig } from '../types';

// Type guard to check if logo is a LogoConfig object
const isLogoConfig = (logo: any): logo is LogoConfig => {
    // Check that it's a plain object with 'source' property AND not a React element
    // React elements (like <Image />) also have 'source' in props, so we need to exclude them
    return logo && typeof logo === 'object' && 'source' in logo && !isValidElement(logo);
};

export const Header: React.FC<HeaderProps> = ({
    title,
    subtitle,
    logo,
    styles: customStyles,
    titleStyle,
    subtitleStyle,
    style,
}) => {
    const { width: screenWidth } = useWindowDimensions();

    // Responsive sizing based on screen width
    const isSmallScreen = screenWidth < 375;
    const isMediumScreen = screenWidth >= 375 && screenWidth < 428;

    const getResponsiveTitleSize = () => {
        if (isSmallScreen) return 24;
        if (isMediumScreen) return 28;
        return 32;
    };

    const getResponsiveSubtitleSize = () => {
        if (isSmallScreen) return 14;
        return 16;
    };

    const renderLogo = () => {
        if (!logo) return null;

        // If logo is a LogoConfig object
        if (isLogoConfig(logo)) {
            const { source, size, width, height, style } = logo;

            // Calculate responsive logo dimensions
            const defaultSize = isSmallScreen ? 60 : isMediumScreen ? 72 : 80;
            const logoWidth = width || size || defaultSize;
            const logoHeight = height || size || defaultSize;

            const logoContainerStyle: ViewStyle = {
                width: logoWidth,
                height: logoHeight,
                alignItems: 'center',
                justifyContent: 'center',
                ...style,
            };

            return (
                <View style={[styles.logoContainer, logoContainerStyle, customStyles?.logoContainer]}>
                    {source}
                </View>
            );
        }

        // If logo is a simple ReactNode (backward compatible)
        return (
            <View style={[styles.logoContainer, customStyles?.logoContainer]}>
                {logo}
            </View>
        );
    };

    return (
        <View style={[styles.container, customStyles?.header, style]}>
            {renderLogo()}

            {title && (
                <Text
                    style={[
                        styles.title,
                        { fontSize: getResponsiveTitleSize() },
                        customStyles?.headerTitle,
                        titleStyle,
                    ]}
                    numberOfLines={2}
                    adjustsFontSizeToFit={isSmallScreen}
                >
                    {title}
                </Text>
            )}

            {subtitle && (
                <Text
                    style={[
                        styles.subtitle,
                        { fontSize: getResponsiveSubtitleSize() },
                        customStyles?.headerSubtitle,
                        subtitleStyle,
                    ]}
                    numberOfLines={3}
                >
                    {subtitle}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginBottom: 32,
        paddingHorizontal: 20,
    },
    logoContainer: {
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1a1a2e',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 24,
    },
});

export default Header;
