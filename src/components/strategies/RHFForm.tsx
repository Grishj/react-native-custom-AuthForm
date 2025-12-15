import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormStrategyProps, AuthFormData, ValidationType, PhoneFieldConfig, FieldsConfig } from '../../types';
import { getYupSchema, getZodSchema } from '../../utils/validationSchemas';
import { Input, PhoneInput, SubmitButton, Checkbox, MailIcon, LockIcon, UserIcon } from '../../ui';

interface RHFFormProps extends FormStrategyProps {
    resolverType: 'yup' | 'zod';
}

const getDefaultValues = (mode: 'signin' | 'signup', fieldsConfig?: FieldsConfig): AuthFormData => ({
    email: '',
    password: '',
    // Always include phone if visible (for both signin and signup)
    ...(fieldsConfig?.phone?.visible && { phone: '' }),
    ...(fieldsConfig?.firstName?.visible && { firstName: '' }),
    ...(fieldsConfig?.lastName?.visible && { lastName: '' }),
    ...(fieldsConfig?.username?.visible && { username: '' }),
    ...(mode === 'signup' && {
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        username: '',
        acceptTerms: false,
    }),
    ...(mode === 'signin' && {
        rememberMe: false,
    }),
});

export const RHFForm: React.FC<RHFFormProps> = ({
    mode,
    onSubmit,
    forgotPassword,
    fields,
    styles: customStyles,
    isLoading = false,
    submitButtonText,
    showRememberMe = true,
    showAcceptTerms = true,
    rememberMe,
    acceptTerms,
    customValidationSchema,
    apiError,
    initialValues,
    resolverType,
    submitButton,
}) => {
    const getResolver = (): any => {
        if (customValidationSchema) {
            return resolverType === 'zod'
                ? zodResolver(customValidationSchema as any)
                : yupResolver(customValidationSchema as any);
        }

        return resolverType === 'zod'
            ? zodResolver(getZodSchema(mode, fields) as any)
            : yupResolver(getYupSchema(mode, fields) as any);
    };

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting, touchedFields },
    } = useForm<AuthFormData>({
        resolver: getResolver(),
        defaultValues: { ...getDefaultValues(mode, fields), ...initialValues },
        mode: 'onBlur',
    });

    const isFieldVisible = (fieldName: keyof AuthFormData): boolean => {
        const fieldConfig = fields?.[fieldName as keyof typeof fields];
        // Check explicit visibility first
        if (fieldConfig?.visible === true) return true;
        if (fieldConfig?.visible === false) return false;
        // Fall back to mode defaults
        if (mode === 'signin') {
            return ['email', 'password'].includes(fieldName);
        }
        return ['email', 'password', 'confirmPassword'].includes(fieldName);
    };

    const onFormSubmit = async (data: AuthFormData) => {
        try {
            await onSubmit(data);
        } catch (error) {
            // Error handling is done by parent
        }
    };

    return (
        <View style={[styles.container, customStyles?.body]}>
            {apiError && (
                <View style={styles.apiErrorContainer}>
                    <Text style={styles.apiErrorText}>{apiError}</Text>
                </View>
            )}

            {/* First Name (signup only) */}
            {isFieldVisible('firstName') && (
                <Controller
                    control={control}
                    name="firstName"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            name="firstName"
                            label={fields?.firstName?.label || 'First Name'}
                            placeholder={fields?.firstName?.placeholder || 'Enter your first name'}
                            value={value || ''}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.firstName?.message}
                            touched={touchedFields.firstName}
                            autoCapitalize="words"
                            styles={customStyles}
                            leftIcon={<UserIcon size={20} color="#9ca3af" />}
                        />
                    )}
                />
            )}

            {/* Last Name (signup only) */}
            {isFieldVisible('lastName') && (
                <Controller
                    control={control}
                    name="lastName"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            name="lastName"
                            label={fields?.lastName?.label || 'Last Name'}
                            placeholder={fields?.lastName?.placeholder || 'Enter your last name'}
                            value={value || ''}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.lastName?.message}
                            touched={touchedFields.lastName}
                            autoCapitalize="words"
                            styles={customStyles}
                            leftIcon={<UserIcon size={20} color="#9ca3af" />}
                        />
                    )}
                />
            )}

            {/* Username (signup only) */}
            {isFieldVisible('username') && (
                <Controller
                    control={control}
                    name="username"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            name="username"
                            label={fields?.username?.label || 'Username'}
                            placeholder={fields?.username?.placeholder || 'Choose a username'}
                            value={value || ''}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.username?.message}
                            touched={touchedFields.username}
                            autoCapitalize="none"
                            styles={customStyles}
                            leftIcon={<UserIcon size={20} color="#9ca3af" />}
                        />
                    )}
                />
            )}

            {/* Email */}
            {isFieldVisible('email') && (
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            name="email"
                            label={fields?.email?.label || 'Email'}
                            placeholder={fields?.email?.placeholder || 'Enter your email'}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.email?.message}
                            touched={touchedFields.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            styles={customStyles}
                            leftIcon={<MailIcon size={20} color="#9ca3af" />}
                        />
                    )}
                />
            )}

            {/* Phone (signup only) */}
            {isFieldVisible('phone') && (
                <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <PhoneInput
                            name="phone"
                            label={fields?.phone?.label || 'Phone Number'}
                            placeholder={fields?.phone?.placeholder || 'Enter your phone number'}
                            value={value || ''}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.phone?.message}
                            touched={touchedFields.phone}
                            styles={customStyles}
                            phoneConfig={fields?.phone as PhoneFieldConfig}
                        />
                    )}
                />
            )}

            {/* Password */}
            {isFieldVisible('password') && (
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            name="password"
                            label={fields?.password?.label || 'Password'}
                            placeholder={fields?.password?.placeholder || 'Enter your password'}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.password?.message}
                            touched={touchedFields.password}
                            secureTextEntry
                            autoComplete="password"
                            styles={customStyles}
                            leftIcon={<LockIcon size={20} color="#9ca3af" />}
                        />
                    )}
                />
            )}

            {/* Forgot Password - Right aligned below password field (signin only) */}
            {mode === 'signin' && forgotPassword?.enabled !== false && forgotPassword?.onPress && (
                <View style={[styles.forgotPasswordContainer, forgotPassword.style]}>
                    <TouchableOpacity onPress={forgotPassword.onPress}>
                        <Text style={[styles.forgotPasswordText, forgotPassword.textStyle]}>
                            {forgotPassword.text || 'Forgot Password?'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Confirm Password (signup only) */}
            {isFieldVisible('confirmPassword') && (
                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            name="confirmPassword"
                            label={fields?.confirmPassword?.label || 'Confirm Password'}
                            placeholder={fields?.confirmPassword?.placeholder || 'Confirm your password'}
                            value={value || ''}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={errors.confirmPassword?.message}
                            touched={touchedFields.confirmPassword}
                            secureTextEntry
                            styles={customStyles}
                            leftIcon={<LockIcon size={20} color="#9ca3af" />}
                        />
                    )}
                />
            )}

            {/* Remember Me (signin only) */}
            {mode === 'signin' && showRememberMe && (
                <Controller
                    control={control}
                    name="rememberMe"
                    render={({ field: { onChange, value } }) => (
                        <Checkbox
                            label={rememberMe?.label || "Remember me"}
                            checked={value || false}
                            onChange={onChange}
                            containerStyle={rememberMe?.containerStyle}
                            checkboxStyle={rememberMe?.checkboxStyle}
                            checkboxCheckedStyle={rememberMe?.checkboxCheckedStyle}
                            checkmarkColor={rememberMe?.checkmarkColor}
                            labelStyle={rememberMe?.labelStyle}
                            linkStyle={rememberMe?.linkStyle}
                        />
                    )}
                />
            )}

            {/* Accept Terms (signup only) */}
            {mode === 'signup' && showAcceptTerms && (
                <View>
                    <Controller
                        control={control}
                        name="acceptTerms"
                        render={({ field: { onChange, value } }) => (
                            <Checkbox
                                label={acceptTerms?.label || "I agree to the"}
                                linkText={acceptTerms?.linkText || "Terms & Conditions"}
                                checked={value || false}
                                onChange={onChange}
                                onLinkPress={acceptTerms?.onLinkPress}
                                containerStyle={acceptTerms?.containerStyle}
                                checkboxStyle={acceptTerms?.checkboxStyle}
                                checkboxCheckedStyle={acceptTerms?.checkboxCheckedStyle}
                                checkmarkColor={acceptTerms?.checkmarkColor}
                                labelStyle={acceptTerms?.labelStyle}
                                linkStyle={acceptTerms?.linkStyle}
                            />
                        )}
                    />
                    {errors.acceptTerms && (
                        <Text style={styles.checkboxError}>{errors.acceptTerms.message}</Text>
                    )}
                </View>
            )}

            {/* Submit Button */}
            <View style={styles.submitContainer}>
                {submitButton?.component ? (
                    submitButton.component({
                        onPress: handleSubmit(onFormSubmit),
                        isLoading: isLoading || isSubmitting,
                        disabled: isLoading || isSubmitting,
                        title: submitButton?.text || submitButtonText || (mode === 'signin' ? 'Sign In' : 'Create Account'),
                    })
                ) : (
                    <SubmitButton
                        onPress={handleSubmit(onFormSubmit)}
                        title={
                            submitButton?.text || submitButtonText ||
                            (mode === 'signin' ? 'Sign In' : 'Create Account')
                        }
                        isLoading={isLoading || isSubmitting}
                        style={submitButton?.style || customStyles?.button}
                        textStyle={submitButton?.textStyle || customStyles?.buttonText}
                        disabledStyle={submitButton?.disabledStyle || customStyles?.buttonDisabled}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    apiErrorContainer: {
        backgroundColor: '#fef2f2',
        borderWidth: 1,
        borderColor: '#fecaca',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
    },
    apiErrorText: {
        color: '#dc2626',
        fontSize: 14,
        textAlign: 'center',
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
        marginTop: -4,
        marginBottom: 8,
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#6366f1',
        fontWeight: '600',
    },
    submitContainer: {
        marginTop: 8,
    },
    checkboxError: {
        fontSize: 12,
        color: '#ef4444',
        marginTop: 4,
        marginLeft: 34,
    },
});

export default RHFForm;
