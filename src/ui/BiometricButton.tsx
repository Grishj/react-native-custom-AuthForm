import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    useWindowDimensions,
} from 'react-native';
import { FingerprintIcon, FaceIdIcon } from './Icons';
import { BiometricConfig } from '../types';

interface BiometricButtonProps {
    config: BiometricConfig;
    style?: any;
}

export const BiometricButton: React.FC<BiometricButtonProps> = ({
    config,
    style,
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
        const type = config.type || (Platform.OS === 'ios' ? 'faceId' : 'fingerprint');
        const iconSize = getIconSize();

        if (type === 'faceId') {
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
                style,
                isAuthenticating && styles.authenticating
            ]}
            onPress={handlePress}
            disabled={isAuthenticating}
            activeOpacity={0.7}
        >
            <View style={[styles.iconContainer, { marginRight: isSmallScreen ? 8 : 12 }]}>
                {getBiometricIcon()}
            </View>
            <Text style={[styles.label, { fontSize: getFontSize() }]}>
                {config.promptMessage || getBiometricLabel()}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
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
        marginRight: 12,
    },
    label: {
        fontSize: 15,
        fontWeight: '500',
        color: '#374151',
    },
});

export default BiometricButton;
