import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native';
import { InputProps } from '../types';
import { EyeOnIcon, EyeOffIcon } from './Icons';

export const Input: React.FC<InputProps> = ({
    name,
    label,
    placeholder,
    value,
    onChangeText,
    onBlur,
    error,
    touched,
    secureTextEntry: initialSecureTextEntry,
    keyboardType = 'default',
    autoCapitalize = 'none',
    autoComplete,
    styles: customStyles,
    leftIcon,
    rightIcon,
    disabled = false,
}) => {
    const { width: screenWidth } = useWindowDimensions();
    const [isFocused, setIsFocused] = useState(false);
    const [secureTextEntry, setSecureTextEntry] = useState(initialSecureTextEntry);
    const showError = touched && error;

    // Responsive sizing
    const isSmallScreen = screenWidth < 375;
    const isMediumScreen = screenWidth >= 375 && screenWidth < 428;

    const getInputHeight = () => {
        if (isSmallScreen) return 46;
        if (isMediumScreen) return 50;
        return 54;
    };

    const getFontSize = () => {
        if (isSmallScreen) return 14;
        if (isMediumScreen) return 15;
        return 16;
    };

    const getLabelSize = () => {
        if (isSmallScreen) return 12;
        return 14;
    };

    const handleFocus = () => setIsFocused(true);

    const handleBlur = () => {
        setIsFocused(false);
        onBlur?.();
    };

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    return (
        <View style={[styles.container, customStyles?.inputContainer]}>
            {label && (
                <Text style={[
                    styles.label,
                    { fontSize: getLabelSize() },
                    customStyles?.inputLabel
                ]}>
                    {label}
                </Text>
            )}

            <View
                style={[
                    styles.inputWrapper,
                    { height: getInputHeight(), borderRadius: isSmallScreen ? 10 : 12 },
                    // Apply custom blur/default style
                    !isFocused ? customStyles?.inputBlurred : undefined,
                    // Apply focus style (custom or default)
                    isFocused ? (customStyles?.inputFocused || styles.inputWrapperFocused) : undefined,
                    showError ? styles.inputWrapperError : undefined,
                    disabled ? styles.inputWrapperDisabled : undefined,
                ]}
            >
                {leftIcon && (
                    <>
                        <View style={styles.iconLeft}>{leftIcon}</View>
                        <View style={styles.iconSeparator} />
                    </>
                )}

                <TextInput
                    style={[
                        styles.input,
                        { fontSize: getFontSize() },
                        customStyles?.input,
                        leftIcon ? styles.inputWithLeftIcon : undefined,
                        (rightIcon || initialSecureTextEntry) ? styles.inputWithRightIcon : undefined,
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor="#9ca3af"
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    autoComplete={autoComplete}
                    editable={!disabled}
                    testID={`input-${name}`}
                />

                {initialSecureTextEntry && (
                    <TouchableOpacity
                        onPress={toggleSecureEntry}
                        style={styles.iconRight}
                        testID={`toggle-${name}`}
                    >
                        {secureTextEntry ? (
                            <EyeOffIcon size={isSmallScreen ? 18 : 22} color="#6b7280" />
                        ) : (
                            <EyeOnIcon size={isSmallScreen ? 18 : 22} color="#6b7280" />
                        )}
                    </TouchableOpacity>
                )}

                {rightIcon && !initialSecureTextEntry && (
                    <View style={styles.iconRight}>{rightIcon}</View>
                )}
            </View>

            {showError && (
                <Text style={[
                    styles.errorText,
                    { fontSize: isSmallScreen ? 11 : 12 },
                    customStyles?.inputError
                ]}>
                    {error}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
        marginBottom: 6,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#e5e7eb',
        borderRadius: 12,
        backgroundColor: '#ffffff',
        overflow: 'hidden',
    },
    inputWrapperFocused: {
        borderColor: '#6366f1',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 2,
    },
    inputWrapperError: {
        borderColor: '#ef4444',
    },
    inputWrapperDisabled: {
        backgroundColor: '#f3f4f6',
        opacity: 0.7,
    },
    input: {
        flex: 1,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#1f2937',
    },
    inputWithLeftIcon: {
        paddingLeft: 8,
    },
    inputWithRightIcon: {
        paddingRight: 8,
    },
    iconLeft: {
        paddingLeft: 16,
    },
    iconSeparator: {
        width: 1,
        height: '100%',
        backgroundColor: '#e5e7eb',
        marginLeft: 12,
    },
    iconRight: {
        paddingRight: 16,
    },
    errorText: {
        fontSize: 12,
        color: '#ef4444',
        marginTop: 4,
        marginLeft: 4,
    },
});

export default Input;
