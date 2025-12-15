import React, { useState, isValidElement } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    useWindowDimensions,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { FingerprintIcon, FaceIdIcon } from './Icons';
import { BiometricConfig } from '../types';

interface BiometricButtonProps {
    config: BiometricConfig;
    style?: ViewStyle;
    textStyle?: TextStyle;
    iconStyle?: ViewStyle;
    IconComponent?: React.ComponentType<any>;
}

export const BiometricButton: React.FC<BiometricButtonProps> = ({
    config,
    style,
    textStyle,
    iconStyle,
    IconComponent,
}) => {
    const { width: screenWidth } = useWindowDimensions();
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    // Responsive sizing
    const isSmallScreen = screenWidth < 375;
    const isMediumScreen = screenWidth >= 375 && screenWidth < 428;

    const getIconSize = () => {
        if (isSmallScreen) return 22;
        if (isMediumScreen) return 25;
        return 28;
    };

    const getFontSize = () => {
        if (isSmallScreen) return 13;
        if (isMediumScreen) return 14;
        return 15;
    };

    const getPadding = () => ({
        paddingVertical: isSmallScreen ? 12 : 16,
        paddingHorizontal: isSmallScreen ? 16 : 24,
    });

    if (!config.enabled) return null;

    const handlePress = async () => {
        setIsAuthenticating(true);
        try {
            await config.onAuthenticate();
        } catch (error) {
            console.error('Biometric authentication failed:', error);
        } finally {
            setIsAuthenticating(false);
        }
    };

    const getBiometricIcon = () => {
        const { icon, type } = config;
        const iconSize = getIconSize();

        // Custom icon from config
        if (icon) {
            if (typeof icon === 'string' && IconComponent) {
                return (
                    <IconComponent
                        name={icon}
                        size={iconSize}
                        color="#6366f1"
                        style={config.iconStyle}
                    />
                );
            }
            if (isValidElement(icon)) {
                return icon;
            }
        }

        const resolveType = type || (Platform.OS === 'ios' ? 'faceId' : 'fingerprint');

        if (resolveType === 'faceId') {
            return <FaceIdIcon size={iconSize} color="#6366f1" />;
        }
        return <FingerprintIcon size={iconSize} color="#6366f1" />;
    };

    const getBiometricLabel = () => {
        const type = config.type || (Platform.OS === 'ios' ? 'faceId' : 'fingerprint');

        if (type === 'faceId') {
            return 'Sign in with Face ID';
        }
        if (type === 'fingerprint') {
            return 'Sign in with Fingerprint';
        }
        return 'Sign in with Biometrics';
    };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                getPadding(),
                { borderRadius: isSmallScreen ? 10 : 12 },
                config.style,
                style,
                isAuthenticating && styles.authenticating
            ]}
            onPress={handlePress}
            disabled={isAuthenticating}
            activeOpacity={0.7}
        >
            <View style={[
                styles.contentContainer,
                { flexDirection: config.iconPosition === 'right' ? 'row-reverse' : 'row' }
            ]}>
                <View style={[
                    styles.iconContainer,
                    config.iconPosition === 'right' ? { marginLeft: isSmallScreen ? 8 : 12 } : { marginRight: isSmallScreen ? 8 : 12 },
                    iconStyle
                ]}>
                    {getBiometricIcon()}
                </View>
                <Text style={[styles.label, { fontSize: getFontSize() }, textStyle, config.promptStyle]}>
                    {config.promptMessage || getBiometricLabel()}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#e5e7eb',
        backgroundColor: '#ffffff',
        marginVertical: 8,
    },
    authenticating: {
        opacity: 0.6,
    },
    iconContainer: {
        // marginRight handled dynamically
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
        color: '#374151',
    },
});

export default BiometricButton;
