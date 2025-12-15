import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    useWindowDimensions,
} from 'react-native';
import { InputProps, PhoneFieldConfig, CountryData } from '../types';
import { CountryCodePicker, getCountryByCode } from './CountryCodePicker';

interface PhoneInputProps extends Omit<InputProps, 'leftIcon'> {
    phoneConfig?: Partial<PhoneFieldConfig>;
    onCountryChange?: (country: CountryData) => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
    name,
    label,
    placeholder,
    value,
    onChangeText,
    onBlur,
    error,
    touched,
    styles: customStyles,
    rightIcon,
    disabled = false,
    phoneConfig,
    onCountryChange,
}) => {
    const { width: screenWidth } = useWindowDimensions();
    const [isFocused, setIsFocused] = useState(false);
    const showError = touched && error;

    const countryPickerEnabled = phoneConfig?.countryPicker?.enabled ?? false;
    const defaultCountryCode = phoneConfig?.countryPicker?.defaultCountry || 'US';
    const [selectedCountry, setSelectedCountry] = useState<CountryData>(
        getCountryByCode(defaultCountryCode)
    );

    useEffect(() => {
        if (phoneConfig?.countryPicker?.defaultCountry) {
            setSelectedCountry(getCountryByCode(phoneConfig.countryPicker.defaultCountry));
        }
    }, [phoneConfig?.countryPicker?.defaultCountry]);

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

    const handleCountrySelect = (country: CountryData) => {
        setSelectedCountry(country);
        onCountryChange?.(country);
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
                    isFocused ? styles.inputWrapperFocused : undefined,
                    showError ? styles.inputWrapperError : undefined,
                    disabled ? styles.inputWrapperDisabled : undefined,
                ]}
            >
                {countryPickerEnabled && (
                    <CountryCodePicker
                        selectedCountry={selectedCountry}
                        onSelect={handleCountrySelect}
                        config={phoneConfig?.countryPicker}
                        disabled={disabled}
                    />
                )}

                <TextInput
                    style={[
                        styles.input,
                        { fontSize: getFontSize() },
                        customStyles?.input,
                        countryPickerEnabled ? styles.inputWithPicker : undefined,
                        rightIcon ? styles.inputWithRightIcon : undefined,
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor="#9ca3af"
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    keyboardType="phone-pad"
                    editable={!disabled}
                    testID={`input-${name}`}
                />

                {rightIcon && (
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
    inputWithPicker: {
        paddingLeft: 12,
    },
    inputWithRightIcon: {
        paddingRight: 8,
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

export default PhoneInput;
