import React, { useState } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Input, SubmitButton, MailIcon } from '../ui';

export interface ForgotPasswordFormProps {
    onSubmit: (email: string) => void | Promise<void>;
    onBackToLogin?: () => void;
    isLoading?: boolean;
    apiError?: string;
    successMessage?: string;
    styles?: {
        container?: ViewStyle;
        title?: TextStyle;
        subtitle?: TextStyle;
        button?: ViewStyle;
        buttonText?: TextStyle;
    };
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
    onSubmit,
    onBackToLogin,
    isLoading = false,
    apiError,
    successMessage,
    styles: customStyles,
}) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | undefined>();
    const [touched, setTouched] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const validateEmail = (value: string): string | undefined => {
        if (!value) return 'Email is required';
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return 'Please enter a valid email address';
        }
        return undefined;
    };

    const handleSubmit = async () => {
        const validationError = validateEmail(email);
        setError(validationError);
        setTouched(true);

        if (!validationError) {
            try {
                await onSubmit(email);
                setSubmitted(true);
            } catch (e) {
                // Error handled by parent
            }
        }
    };

    if (submitted && successMessage) {
        return (
            <View style={[styles.container, customStyles?.container]}>
                <View style={styles.successContainer}>
                    <Text style={styles.successIcon}>✅</Text>
                    <Text style={[styles.title, customStyles?.title]}>Check Your Email</Text>
                    <Text style={[styles.subtitle, customStyles?.subtitle]}>
                        {successMessage}
                    </Text>
                </View>

                {onBackToLogin && (
                    <SubmitButton
                        onPress={onBackToLogin}
                        title="Back to Sign In"
                        style={customStyles?.button}
                        textStyle={customStyles?.buttonText}
                    />
                )}
            </View>
        );
    }

    return (
        <View style={[styles.container, customStyles?.container]}>
            <View style={styles.headerContainer}>
                <Text style={[styles.title, customStyles?.title]}>Forgot Password?</Text>
                <Text style={[styles.subtitle, customStyles?.subtitle]}>
                    Enter your email address and we'll send you a link to reset your password.
                </Text>
            </View>

            {apiError && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{apiError}</Text>
                </View>
            )}

            <Input
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    if (touched) {
                        setError(validateEmail(text));
                    }
                }}
                onBlur={() => {
                    setTouched(true);
                    setError(validateEmail(email));
                }}
                error={error}
                touched={touched}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                leftIcon={<MailIcon size={20} color="#9ca3af" />}
            />

            <View style={styles.buttonContainer}>
                <SubmitButton
                    onPress={handleSubmit}
                    title="Send Reset Link"
                    isLoading={isLoading}
                    style={customStyles?.button}
                    textStyle={customStyles?.buttonText}
                />
            </View>

            {onBackToLogin && (
                <View style={styles.backContainer}>
                    <Text style={styles.backText}>Remember your password? </Text>
                    <Text style={styles.backLink} onPress={onBackToLogin}>
                        Sign In
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    headerContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 15,
        color: '#6b7280',
        textAlign: 'center',
        lineHeight: 22,
    },
    errorContainer: {
        backgroundColor: '#fef2f2',
        borderWidth: 1,
        borderColor: '#fecaca',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
    },
    errorText: {
        color: '#dc2626',
        fontSize: 14,
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 8,
    },
    successContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    successIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    backContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    backText: {
        fontSize: 14,
        color: '#6b7280',
    },
    backLink: {
        fontSize: 14,
        color: '#6366f1',
        fontWeight: '600',
    },
});

export default ForgotPasswordForm;
