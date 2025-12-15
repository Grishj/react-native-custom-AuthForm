import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

// This component provides automatic icon detection:
// 1. @expo/vector-icons (if using Expo)
// 2. react-native-vector-icons (if installed)
// 3. Fallback to Unicode/styled icons

interface IconProps {
    size?: number;
    color?: string;
}

// Try to import icons dynamically
let Ionicons: any = null;
let MaterialCommunityIcons: any = null;
let FontAwesome: any = null;

// Try Expo vector icons first
try {
    const expoIcons = require('@expo/vector-icons');
    Ionicons = expoIcons.Ionicons;
    MaterialCommunityIcons = expoIcons.MaterialCommunityIcons;
    FontAwesome = expoIcons.FontAwesome;
} catch (e) {
    // Try react-native-vector-icons
    try {
        Ionicons = require('react-native-vector-icons/Ionicons').default;
        MaterialCommunityIcons = require('react-native-vector-icons/MaterialCommunityIcons').default;
        FontAwesome = require('react-native-vector-icons/FontAwesome').default;
    } catch (e2) {
        // Use fallback icons
    }
}

const hasVectorIcons = Ionicons !== null;

// ============================================================================
// Form Field Icons
// ============================================================================

export const MailIcon: React.FC<IconProps> = ({ size = 20, color = '#9ca3af' }) => {
    if (hasVectorIcons && Ionicons) {
        return <Ionicons name="mail-outline" size={size} color={color} />;
    }
    return (
        <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.fallbackIcon, { fontSize: size * 0.8, color }]}>✉</Text>
        </View>
    );
};

export const LockIcon: React.FC<IconProps> = ({ size = 20, color = '#9ca3af' }) => {
    if (hasVectorIcons && Ionicons) {
        return <Ionicons name="lock-closed-outline" size={size} color={color} />;
    }
    return (
        <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.fallbackIcon, { fontSize: size * 0.8, color }]}>🔒</Text>
        </View>
    );
};

export const PhoneIcon: React.FC<IconProps> = ({ size = 20, color = '#9ca3af' }) => {
    if (hasVectorIcons && Ionicons) {
        return <Ionicons name="phone-portrait-outline" size={size} color={color} />;
    }
    return (
        <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.fallbackIcon, { fontSize: size * 0.8, color }]}>📱</Text>
        </View>
    );
};

export const UserIcon: React.FC<IconProps> = ({ size = 20, color = '#9ca3af' }) => {
    if (hasVectorIcons && Ionicons) {
        return <Ionicons name="person-outline" size={size} color={color} />;
    }
    return (
        <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.fallbackIcon, { fontSize: size * 0.8, color }]}>👤</Text>
        </View>
    );
};

export const SearchIcon: React.FC<IconProps> = ({ size = 20, color = '#9ca3af' }) => {
    if (hasVectorIcons && Ionicons) {
        return <Ionicons name="search-outline" size={size} color={color} />;
    }
    return (
        <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.fallbackIcon, { fontSize: size * 0.8, color }]}>🔍</Text>
        </View>
    );
};

export const CloseIcon: React.FC<IconProps> = ({ size = 20, color = '#9ca3af' }) => {
    if (hasVectorIcons && Ionicons) {
        return <Ionicons name="close" size={size} color={color} />;
    }
    return (
        <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.fallbackIcon, { fontSize: size * 0.9, color }]}>✕</Text>
        </View>
    );
};

export const CheckIcon: React.FC<IconProps> = ({ size = 20, color = '#ffffff' }) => {
    if (hasVectorIcons && Ionicons) {
        return <Ionicons name="checkmark" size={size} color={color} />;
    }
    return (
        <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.fallbackIcon, { fontSize: size * 0.8, color, fontWeight: '700' }]}>✓</Text>
        </View>
    );
};

// ============================================================================
// Password Visibility Toggle Icons
// ============================================================================

export const EyeOnIcon: React.FC<IconProps> = ({ size = 22, color = '#6b7280' }) => {
    if (hasVectorIcons && Ionicons) {
        return <Ionicons name="eye-outline" size={size} color={color} />;
    }
    return (
        <View style={[styles.iconContainer, { width: size, height: size }]}>
            <View style={[styles.eyeOuter, { width: size, height: size * 0.55, borderColor: color }]}>
                <View style={[styles.eyeInner, { width: size * 0.35, height: size * 0.35, backgroundColor: color }]} />
            </View>
        </View>
    );
};

export const EyeOffIcon: React.FC<IconProps> = ({ size = 22, color = '#6b7280' }) => {
    if (hasVectorIcons && Ionicons) {
        return <Ionicons name="eye-off-outline" size={size} color={color} />;
    }
    return (
        <View style={[styles.iconContainer, { width: size, height: size }]}>
            <View style={[styles.eyeOuter, { width: size, height: size * 0.55, borderColor: color, opacity: 0.5 }]}>
                <View style={[styles.eyeInner, { width: size * 0.35, height: size * 0.35, backgroundColor: color }]} />
            </View>
            <View style={[styles.eyeSlash, { width: size * 1.2, borderColor: color }]} />
        </View>
    );
};

// ============================================================================
// Social Login Icons
// ============================================================================

export const GoogleIcon: React.FC<IconProps> = ({ size = 20 }) => {
    if (hasVectorIcons && FontAwesome) {
        return <FontAwesome name="google" size={size} color="#4285F4" />;
    }
    return (
        <View style={[styles.googleIcon, { width: size, height: size }]}>
            <Text style={[styles.googleG, { fontSize: size * 0.8 }]}>G</Text>
        </View>
    );
};

export const AppleIcon: React.FC<IconProps> = ({ size = 20, color = '#ffffff' }) => {
    if (hasVectorIcons && Ionicons) {
        return <Ionicons name="logo-apple" size={size} color={color} />;
    }
    return (
        <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.appleIcon, { fontSize: size, color }]}></Text>
        </View>
    );
};

export const FacebookIcon: React.FC<IconProps> = ({ size = 20, color = '#ffffff' }) => {
    if (hasVectorIcons && Ionicons) {
        return <Ionicons name="logo-facebook" size={size} color={color} />;
    }
    return (
        <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.fallbackIcon, { fontSize: size * 0.9, color, fontWeight: '700' }]}>f</Text>
        </View>
    );
};

export const TwitterIcon: React.FC<IconProps> = ({ size = 20, color = '#ffffff' }) => {
    if (hasVectorIcons && Ionicons) {
        return <Ionicons name="logo-twitter" size={size} color={color} />;
    }
    return (
        <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.fallbackIcon, { fontSize: size * 0.85, color, fontWeight: '700' }]}>𝕏</Text>
        </View>
    );
};

export const GitHubIcon: React.FC<IconProps> = ({ size = 20, color = '#ffffff' }) => {
    if (hasVectorIcons && Ionicons) {
        return <Ionicons name="logo-github" size={size} color={color} />;
    }
    return (
        <View style={[styles.iconContainer, { width: size, height: size }]}>
            <View style={[styles.githubIcon, { width: size, height: size, backgroundColor: color, borderRadius: size / 2 }]} />
        </View>
    );
};

// ============================================================================
// Biometric Icons
// ============================================================================

export const FingerprintIcon: React.FC<IconProps> = ({ size = 24, color = '#6366f1' }) => {
    if (hasVectorIcons && Ionicons) {
        return <Ionicons name="finger-print" size={size} color={color} />;
    }
    return (
        <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.fallbackIcon, { fontSize: size * 0.9, color }]}>👆</Text>
        </View>
    );
};

export const FaceIdIcon: React.FC<IconProps> = ({ size = 24, color = '#6366f1' }) => {
    if (hasVectorIcons && MaterialCommunityIcons) {
        return <MaterialCommunityIcons name="face-recognition" size={size} color={color} />;
    }
    return (
        <View style={[styles.iconContainer, { width: size, height: size }]}>
            <Text style={[styles.fallbackIcon, { fontSize: size * 0.9, color }]}>😊</Text>
        </View>
    );
};

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    fallbackIcon: {
        textAlign: 'center',
    },
    eyeOuter: {
        borderWidth: 2,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    eyeInner: {
        borderRadius: 100,
    },
    eyeSlash: {
        position: 'absolute',
        height: 0,
        borderTopWidth: 2,
        transform: [{ rotate: '-45deg' }],
    },
    googleIcon: {
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleG: {
        fontWeight: '700',
        color: '#4285F4',
    },
    appleIcon: {
        fontWeight: '400',
    },
    githubIcon: {},
});

export default {
    MailIcon,
    LockIcon,
    PhoneIcon,
    UserIcon,
    SearchIcon,
    CloseIcon,
    CheckIcon,
    EyeOnIcon,
    EyeOffIcon,
    GoogleIcon,
    AppleIcon,
    FacebookIcon,
    TwitterIcon,
    GitHubIcon,
    FingerprintIcon,
    FaceIdIcon,
};
