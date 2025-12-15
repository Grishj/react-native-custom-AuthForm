import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    StyleSheet,
    useWindowDimensions,
    TextInput,
} from 'react-native';
import { CountryData, CountryPickerConfig } from '../types';
import { SearchIcon, CloseIcon } from './Icons';

export const COUNTRIES: CountryData[] = [
    { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
    { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
    { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
    { code: 'NP', name: 'Nepal', dialCode: '+977', flag: '🇳🇵' },
    { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
    { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
    { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
    { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
    { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
    { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
    { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
    { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
    { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
    { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺' },
    { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
    { code: 'AE', name: 'UAE', dialCode: '+971', flag: '🇦🇪' },
    { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
    { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
    { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾' },
    { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭' },
    { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩' },
    { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭' },
    { code: 'PK', name: 'Pakistan', dialCode: '+92', flag: '🇵🇰' },
    { code: 'BD', name: 'Bangladesh', dialCode: '+880', flag: '🇧🇩' },
    { code: 'NG', name: 'Nigeria', dialCode: '+234', flag: '🇳🇬' },
    { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
    { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷' },
    { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
    { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
    { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
    { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
    { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
    { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴' },
    { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
    { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮' },
    { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱' },
    { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
    { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
    { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿' },
];

export const getCountryByCode = (code: string): CountryData => {
    return COUNTRIES.find(c => c.code === code) || COUNTRIES[0];
};

interface CountryCodePickerProps {
    selectedCountry: CountryData;
    onSelect: (country: CountryData) => void;
    config?: CountryPickerConfig;
    disabled?: boolean;
}

export const CountryCodePicker: React.FC<CountryCodePickerProps> = ({
    selectedCountry,
    onSelect,
    config,
    disabled = false,
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const isSmallScreen = screenWidth < 375;

    // Filter countries based on search query
    const filteredCountries = useMemo(() => {
        if (!searchQuery.trim()) return COUNTRIES;
        const query = searchQuery.toLowerCase().trim();
        return COUNTRIES.filter(
            country =>
                country.name.toLowerCase().includes(query) ||
                country.code.toLowerCase().includes(query) ||
                country.dialCode.includes(query)
        );
    }, [searchQuery]);

    const openModal = () => {
        if (!disabled) {
            setModalVisible(true);
            setSearchQuery(''); // Reset search when opening
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setSearchQuery('');
    };

    const handleSelect = (country: CountryData) => {
        onSelect(country);
        closeModal();
    };

    if (config?.customComponent) {
        return config.customComponent({
            selectedCountry,
            onSelect: handleSelect,
            visible: modalVisible,
            onClose: closeModal,
        }) as React.ReactElement;
    }

    const renderCountryItem = ({ item }: { item: CountryData }) => (
        <TouchableOpacity
            style={[
                styles.listItem,
                config?.styles?.listItem,
                item.code === selectedCountry.code && styles.listItemSelected,
            ]}
            onPress={() => handleSelect(item)}
            activeOpacity={0.7}
        >
            <Text style={styles.flag}>{item.flag}</Text>
            <View style={styles.countryInfo}>
                <Text style={[styles.countryName, config?.styles?.listItemText]}>
                    {item.name}
                </Text>
                <Text style={styles.dialCode}>{item.dialCode}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            <TouchableOpacity
                style={[
                    styles.pickerButton,
                    config?.styles?.button,
                    disabled && styles.pickerButtonDisabled,
                ]}
                onPress={openModal}
                disabled={disabled}
                activeOpacity={0.7}
            >
                <Text style={styles.selectedFlag}>{selectedCountry.flag}</Text>
                <Text style={[
                    styles.selectedDialCode,
                    { fontSize: isSmallScreen ? 13 : 14 },
                    config?.styles?.buttonText,
                ]}>
                    {selectedCountry.dialCode}
                </Text>
                <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={closeModal}
                statusBarTranslucent
            >
                <View style={styles.modalOverlay}>
                    <TouchableOpacity
                        style={styles.modalBackdrop}
                        activeOpacity={1}
                        onPress={closeModal}
                    />
                    <View
                        style={[
                            styles.modalContent,
                            { maxHeight: screenHeight * 0.7 },
                            config?.styles?.modalContainer,
                        ]}
                        onStartShouldSetResponder={() => true}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select Country</Text>
                            <TouchableOpacity
                                onPress={closeModal}
                                style={styles.closeButton}
                            >
                                <CloseIcon size={20} color="#6b7280" />
                            </TouchableOpacity>
                        </View>

                        {/* Search Input */}
                        <View style={styles.searchContainer}>
                            <SearchIcon size={18} color="#9ca3af" />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search country or code..."
                                placeholderTextColor="#9ca3af"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            {searchQuery.length > 0 && (
                                <TouchableOpacity
                                    onPress={() => setSearchQuery('')}
                                    style={styles.clearButton}
                                >
                                    <CloseIcon size={16} color="#9ca3af" />
                                </TouchableOpacity>
                            )}
                        </View>

                        {filteredCountries.length === 0 ? (
                            <View style={styles.noResults}>
                                <Text style={styles.noResultsText}>No countries found</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={filteredCountries}
                                renderItem={renderCountryItem}
                                keyExtractor={(item) => item.code}
                                showsVerticalScrollIndicator={false}
                                ItemSeparatorComponent={() => <View style={styles.separator} />}
                                keyboardShouldPersistTaps="handled"
                            />
                        )}
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    pickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#f9fafb',
        borderRightWidth: 1,
        borderRightColor: '#e5e7eb',
        gap: 4,
    },
    pickerButtonDisabled: {
        opacity: 0.5,
    },
    selectedFlag: {
        fontSize: 18,
    },
    selectedDialCode: {
        fontSize: 14,
        fontWeight: '500',
        color: '#374151',
    },
    dropdownArrow: {
        fontSize: 8,
        color: '#9ca3af',
        marginLeft: 2,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalBackdrop: {
        flex: 1,
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
    },
    closeButton: {
        padding: 4,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginVertical: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#f3f4f6',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1f2937',
        padding: 0,
        marginLeft: 8,
    },
    clearButton: {
        padding: 4,
    },
    noResults: {
        padding: 40,
        alignItems: 'center',
    },
    noResultsText: {
        fontSize: 16,
        color: '#6b7280',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    listItemSelected: {
        backgroundColor: '#f0f0ff',
    },
    flag: {
        fontSize: 24,
        marginRight: 12,
    },
    countryInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    countryName: {
        fontSize: 16,
        color: '#1f2937',
    },
    dialCode: {
        fontSize: 14,
        color: '#6b7280',
    },
    separator: {
        height: 1,
        backgroundColor: '#f3f4f6',
        marginLeft: 52,
    },
});

export default CountryCodePicker;
