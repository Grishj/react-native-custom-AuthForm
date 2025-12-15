import { ViewStyle, TextStyle } from 'react-native';

// ============================================================================
// Theme Colors
// ============================================================================

export interface ThemeColors {
    /** Primary brand color - used for buttons, links, active states */
    primary: string;
    /** Secondary brand color */
    secondary: string;
    /** Main background color */
    background: string;
    /** Card/surface background color */
    surface: string;
    /** Primary text color */
    text: string;
    /** Secondary/muted text color */
    textSecondary: string;
    /** Placeholder text color */
    placeholder: string;
    /** Error/danger color */
    error: string;
    /** Success color */
    success: string;
    /** Warning color */
    warning: string;
    /** Border color */
    border: string;
    /** Focused border color */
    borderFocused: string;
    /** Disabled state color */
    disabled: string;
}

// ============================================================================
// Theme Typography
// ============================================================================

export interface ThemeTypography {
    /** Font family for headings */
    fontFamilyHeading?: string;
    /** Font family for body text */
    fontFamilyBody?: string;
    /** Title/heading font size */
    fontSizeTitle: number;
    /** Subtitle font size */
    fontSizeSubtitle: number;
    /** Body/label font size */
    fontSizeBody: number;
    /** Small/helper text font size */
    fontSizeSmall: number;
    /** Button text font size */
    fontSizeButton: number;
}

// ============================================================================
// Theme Spacing
// ============================================================================

export interface ThemeSpacing {
    /** Extra small spacing (4px) */
    xs: number;
    /** Small spacing (8px) */
    sm: number;
    /** Medium spacing (16px) */
    md: number;
    /** Large spacing (24px) */
    lg: number;
    /** Extra large spacing (32px) */
    xl: number;
    /** 2x large spacing (48px) */
    xxl: number;
}

// ============================================================================
// Theme Border Radius
// ============================================================================

export interface ThemeBorderRadius {
    /** Small radius (6px) */
    sm: number;
    /** Medium radius (12px) */
    md: number;
    /** Large radius (16px) */
    lg: number;
    /** Full/pill radius (9999px) */
    full: number;
}

// ============================================================================
// Complete Theme Interface
// ============================================================================

export interface Theme {
    colors: ThemeColors;
    typography: ThemeTypography;
    spacing: ThemeSpacing;
    borderRadius: ThemeBorderRadius;
    /** Whether this is a dark theme */
    isDark: boolean;
}

// ============================================================================
// Default Light Theme
// ============================================================================

export const defaultLightTheme: Theme = {
    colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#1f2937',
        textSecondary: '#6b7280',
        placeholder: '#9ca3af',
        error: '#ef4444',
        success: '#22c55e',
        warning: '#f59e0b',
        border: '#e5e7eb',
        borderFocused: '#6366f1',
        disabled: '#d1d5db',
    },
    typography: {
        fontSizeTitle: 28,
        fontSizeSubtitle: 16,
        fontSizeBody: 14,
        fontSizeSmall: 12,
        fontSizeButton: 16,
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },
    borderRadius: {
        sm: 6,
        md: 12,
        lg: 16,
        full: 9999,
    },
    isDark: false,
};

// ============================================================================
// Default Dark Theme
// ============================================================================

export const defaultDarkTheme: Theme = {
    colors: {
        primary: '#818cf8',
        secondary: '#a78bfa',
        background: '#111827',
        surface: '#1f2937',
        text: '#f9fafb',
        textSecondary: '#9ca3af',
        placeholder: '#6b7280',
        error: '#f87171',
        success: '#4ade80',
        warning: '#fbbf24',
        border: '#374151',
        borderFocused: '#818cf8',
        disabled: '#4b5563',
    },
    typography: {
        fontSizeTitle: 28,
        fontSizeSubtitle: 16,
        fontSizeBody: 14,
        fontSizeSmall: 12,
        fontSizeButton: 16,
    },
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48,
    },
    borderRadius: {
        sm: 6,
        md: 12,
        lg: 16,
        full: 9999,
    },
    isDark: true,
};

// ============================================================================
// Theme Creation Helper
// ============================================================================

export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Create a custom theme by merging with the default light theme
 * @param overrides - Partial theme object with custom values
 * @returns Complete theme object
 */
export const createTheme = (overrides: DeepPartial<Theme>): Theme => {
    const baseTheme = overrides.isDark ? defaultDarkTheme : defaultLightTheme;

    return {
        colors: { ...baseTheme.colors, ...overrides.colors },
        typography: { ...baseTheme.typography, ...overrides.typography },
        spacing: { ...baseTheme.spacing, ...overrides.spacing },
        borderRadius: { ...baseTheme.borderRadius, ...overrides.borderRadius },
        isDark: overrides.isDark ?? baseTheme.isDark,
    };
};
