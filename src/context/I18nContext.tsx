import React, { createContext, useContext, useMemo, ReactNode, useCallback } from 'react';
import { Translations, defaultEnTranslations } from '../i18n';

// ============================================================================
// I18n Context
// ============================================================================

interface I18nContextValue {
    translations: Translations;
    t: (key: keyof Translations) => string;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

// ============================================================================
// I18n Provider Props
// ============================================================================

export interface I18nProviderProps {
    /** Custom translations */
    translations?: Translations;
    /** Children components */
    children: ReactNode;
}

// ============================================================================
// I18n Provider Component
// ============================================================================

/**
 * I18nProvider provides translation context to all child components.
 * If no translations provided, defaults to English.
 */
export const I18nProvider: React.FC<I18nProviderProps> = ({
    translations = defaultEnTranslations,
    children,
}) => {
    const t = useCallback(
        (key: keyof Translations): string => {
            return translations[key] || defaultEnTranslations[key] || key;
        },
        [translations]
    );

    const value = useMemo(
        () => ({ translations, t }),
        [translations, t]
    );

    return (
        <I18nContext.Provider value={value}>
            {children}
        </I18nContext.Provider>
    );
};

// ============================================================================
// useTranslation Hook
// ============================================================================

interface UseTranslationReturn {
    /** Translation function */
    t: (key: keyof Translations) => string;
    /** Full translations object */
    translations: Translations;
}

/**
 * Hook to access translations.
 * Returns English defaults if used outside I18nProvider.
 */
export const useTranslation = (): UseTranslationReturn => {
    const context = useContext(I18nContext);

    // Return defaults if used outside provider (backward compatibility)
    if (!context) {
        return {
            t: (key: keyof Translations) => defaultEnTranslations[key] || key,
            translations: defaultEnTranslations,
        };
    }

    return {
        t: context.t,
        translations: context.translations,
    };
};

export default I18nProvider;
