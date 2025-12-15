import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, ViewStyle, TextStyle } from 'react-native';
import { CheckIcon } from './Icons';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    linkText?: string;
    onLinkPress?: () => void;
    // Style customization props
    containerStyle?: ViewStyle;
    checkboxStyle?: ViewStyle;
    checkboxCheckedStyle?: ViewStyle;
    checkmarkColor?: string;
    labelStyle?: TextStyle;
    linkStyle?: TextStyle;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    label,
    checked,
    onChange,
    disabled = false,
    linkText,
    onLinkPress,
    containerStyle,
    checkboxStyle,
    checkboxCheckedStyle,
    checkmarkColor = '#ffffff',
    labelStyle,
    linkStyle,
}) => {
    const { width: screenWidth } = useWindowDimensions();

    // Responsive sizing
    const isSmallScreen = screenWidth < 375;

    const getCheckboxSize = () => isSmallScreen ? 18 : 22;
    const getFontSize = () => isSmallScreen ? 12 : 14;
    const getCheckmarkSize = () => isSmallScreen ? 11 : 14;

    return (
        <View style={[styles.container, { marginVertical: isSmallScreen ? 6 : 8 }, containerStyle]}>
            <TouchableOpacity
                style={[
                    styles.checkbox,
                    {
                        width: getCheckboxSize(),
                        height: getCheckboxSize(),
                        borderRadius: isSmallScreen ? 4 : 6,
                    },
                    checkboxStyle,
                    checked && styles.checkboxChecked,
                    checked && checkboxCheckedStyle,
                    disabled && styles.checkboxDisabled,
                ]}
                onPress={() => !disabled && onChange(!checked)}
                activeOpacity={0.7}
                disabled={disabled}
            >
                {checked && (
                    <CheckIcon size={getCheckmarkSize()} color={checkmarkColor} />
                )}
            </TouchableOpacity>

            <View style={[styles.labelContainer, { marginLeft: isSmallScreen ? 8 : 12 }]}>
                <Text style={[styles.label, { fontSize: getFontSize() }, disabled && styles.labelDisabled, labelStyle]}>
                    {label}
                </Text>
                {linkText && (
                    onLinkPress ? (
                        <TouchableOpacity onPress={onLinkPress}>
                            <Text style={[styles.link, { fontSize: getFontSize() }, linkStyle]}>{linkText}</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={[styles.link, { fontSize: getFontSize() }, linkStyle]}>{linkText}</Text>
                    )
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#d1d5db',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    checkboxChecked: {
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
    },
    checkboxDisabled: {
        opacity: 0.5,
    },
    checkmark: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '700',
    },
    labelContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginLeft: 12,
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        color: '#4b5563',
    },
    labelDisabled: {
        opacity: 0.5,
    },
    link: {
        fontSize: 14,
        color: '#6366f1',
        fontWeight: '500',
        marginLeft: 4,
    },
});

export default Checkbox;
