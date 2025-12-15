import { TouchableOpacity, Text, View, StyleSheet, ViewStyle, useWindowDimensions, TextStyle } from 'react-native';
import { SocialButtonProps, SocialProvider } from '../types';
import { GoogleIcon, AppleIcon, FacebookIcon, TwitterIcon, GitHubIcon } from './Icons';

interface SocialConfig {
    color: string;
    icon: React.ReactNode;
    label: string;
}

const getSocialConfig = (size: number): Record<SocialProvider, SocialConfig> => ({
    google: {
        color: '#ffffff',
        icon: <GoogleIcon size={size} />,
        label: 'Google'
    },
    apple: {
        color: '#ffffff',
        icon: <AppleIcon size={size} color="#000000" />,
        label: 'Apple'
    },
    facebook: {
        color: '#ffffff',
        icon: <FacebookIcon size={size} color="#1877f2" />,
        label: 'Facebook'
    },
    twitter: {
        color: '#ffffff',
        icon: <TwitterIcon size={size} color="#1da1f2" />,
        label: 'Twitter'
    },
    github: {
        color: '#ffffff',
        icon: <GitHubIcon size={size} color="#24292e" />,
        label: 'GitHub'
    },
});

export const SocialButton: React.FC<SocialButtonProps> = ({
    provider,
    onPress,
    disabled = false,
    iconComponent,
    label,
    style,
    textStyle,
    iconStyle,
    icon,
    iconPosition = 'left',
    IconComponent,
}) => {
    const { width: screenWidth } = useWindowDimensions();

    // Responsive sizing
    const isSmallScreen = screenWidth < 375;
    const isMediumScreen = screenWidth >= 375 && screenWidth < 428;

    const getIconSize = () => {
        if (isSmallScreen) return 16;
        if (isMediumScreen) return 18;
        return 20;
    };

    const getButtonHeight = () => {
        if (isSmallScreen) return 40;
        if (isMediumScreen) return 44;
        return 48;
    };

    const getFontSize = () => {
        if (isSmallScreen) return 12;
        if (isMediumScreen) return 13;
        return 14;
    };

    const getMinWidth = () => {
        if (isSmallScreen) return 100;
        if (isMediumScreen) return 110;
        return 120;
    };

    const getPadding = () => {
        if (isSmallScreen) return 12;
        if (isMediumScreen) return 16;
        return 20;
    };

    const config = getSocialConfig(getIconSize())[provider];

    return (
        <TouchableOpacity
            style={[
                styles.button,
                {
                    height: getButtonHeight(),
                    borderRadius: getButtonHeight() / 2,
                    paddingHorizontal: getPadding(),
                    minWidth: getMinWidth(),
                },
                disabled && styles.buttonDisabled,
                style,
            ]}
            onPress={onPress}
            disabled={disabled}
            activeOpacity={0.7}
            testID={`social-${provider}`}
        >
            <View style={{
                flexDirection: iconPosition === 'right' ? 'row-reverse' : 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={[
                    styles.iconContainer,
                    iconPosition === 'right' ? { marginLeft: 8, marginRight: 0 } : { marginRight: 8 },
                    iconStyle
                ]}>
                    {(typeof icon === 'string' && IconComponent) ? (
                        <IconComponent name={icon} size={getIconSize()} color={config.color} style={iconStyle} />
                    ) : (
                        icon || iconComponent || config.icon
                    )}
                </View>
                <Text style={[styles.label, { fontSize: getFontSize() }, textStyle]}>
                    {label || config.label}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

interface SocialLoginGroupProps {
    providers: SocialButtonProps[];
    containerStyle?: ViewStyle;
    dividerText?: string;
    dividerStyle?: ViewStyle;
    dividerTextStyle?: TextStyle;
}

export const SocialLoginGroup: React.FC<SocialLoginGroupProps> = ({
    providers,
    containerStyle,
    dividerText = 'or continue with',
    dividerStyle,
    dividerTextStyle,
}) => {
    const { width: screenWidth } = useWindowDimensions();
    const isSmallScreen = screenWidth < 375;

    if (providers.length === 0) return null;

    return (
        <View style={[styles.container, containerStyle]}>
            <View style={[styles.divider, dividerStyle]}>
                <View style={styles.dividerLine} />
                <Text style={[styles.dividerText, { fontSize: isSmallScreen ? 12 : 14 }, dividerTextStyle]}>
                    {dividerText}
                </Text>
                <View style={styles.dividerLine} />
            </View>

            <View style={[styles.buttonsContainer, { gap: isSmallScreen ? 8 : 12 }]}>
                {providers.map((providerProps) => (
                    <SocialButton
                        key={providerProps.provider}
                        {...providerProps}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 24,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e5e7eb',
    },
    dividerText: {
        marginHorizontal: 16,
        fontSize: 14,
        color: '#9ca3af',
        fontWeight: '500',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 12,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        borderRadius: 24,
        paddingHorizontal: 20,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        minWidth: 120,
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    iconContainer: {
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1f2937',
    },
});

export default SocialButton;
