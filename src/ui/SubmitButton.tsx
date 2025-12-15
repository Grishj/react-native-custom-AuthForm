import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
    useWindowDimensions,
} from 'react-native';

interface SubmitButtonProps {
    onPress: () => void;
    title: string;
    isLoading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabledStyle?: ViewStyle;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
    onPress,
    title,
    isLoading = false,
    disabled = false,
    style,
    textStyle,
    disabledStyle,
}) => {
    const { width: screenWidth } = useWindowDimensions();
    const isDisabled = disabled || isLoading;

    // Responsive sizing
    const isSmallScreen = screenWidth < 375;
    const isMediumScreen = screenWidth >= 375 && screenWidth < 428;

    const getButtonHeight = () => {
        if (isSmallScreen) return 48;
        if (isMediumScreen) return 52;
        return 56;
    };

    const getFontSize = () => {
        if (isSmallScreen) return 15;
        if (isMediumScreen) return 16;
        return 17;
    };

    const getBorderRadius = () => {
        if (isSmallScreen) return 10;
        if (isMediumScreen) return 12;
        return 14;
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    height: getButtonHeight(),
                    borderRadius: getBorderRadius()
                },
                style,
                isDisabled && styles.buttonDisabled,
                isDisabled && disabledStyle,
            ]}
            onPress={onPress}
            disabled={isDisabled}
            activeOpacity={0.85}
            testID="submit-button"
        >
            {isLoading ? (
                <ActivityIndicator color="#ffffff" size="small" />
            ) : (
                <Text style={[
                    styles.buttonText,
                    { fontSize: getFontSize() },
                    textStyle
                ]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 56,
        borderRadius: 14,
        backgroundColor: '#6366f1',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonDisabled: {
        backgroundColor: '#a5b4fc',
        shadowOpacity: 0.1,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#ffffff',
        letterSpacing: 0.3,
    },
});

export default SubmitButton;
