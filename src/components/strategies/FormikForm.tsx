import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { FormStrategyProps, AuthFormData, PhoneFieldConfig, FieldsConfig } from '../../types';
import { getYupSchema } from '../../utils/validationSchemas';
import { Input, PhoneInput, SubmitButton, Checkbox, MailIcon, LockIcon, UserIcon, PhoneIcon } from '../../ui';

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

export const FormikForm: React.FC<FormStrategyProps> = ({
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
    submitButton,
    iconSource,
}) => {
    const validationSchema = customValidationSchema || getYupSchema(mode, fields);
    const defaultValues = { ...getDefaultValues(mode, fields), ...initialValues };

    const handleSubmit = async (
        values: AuthFormData,
        helpers: FormikHelpers<AuthFormData>
    ) => {
        try {
            await onSubmit(values);
            helpers.resetForm();
        } catch (error) {
            helpers.setSubmitting(false);
        }
    };

    const isFieldVisible = (fieldName: keyof AuthFormData): boolean => {
        const fieldConfig = fields?.[fieldName as keyof typeof fields];
        if (fieldConfig?.visible === true) return true;
        if (fieldConfig?.visible === false) return false;
        if (mode === 'signin') {
            return ['email', 'password'].includes(fieldName);
        }
        return ['email', 'password', 'confirmPassword'].includes(fieldName);
    };

    return (
        <Formik
            initialValues={defaultValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            validateOnBlur
            validateOnChange={false}
        >
            {({
                handleChange,
                handleBlur,
                handleSubmit: formikSubmit,
                values,
                errors,
                touched,
                setFieldValue,
                isSubmitting,
            }) => (
                <View style={[styles.container, customStyles?.body]}>
                    {apiError && (
                        <View style={styles.apiErrorContainer}>
                            <Text style={styles.apiErrorText}>{apiError}</Text>
                        </View>
                    )}

                    {isFieldVisible('firstName') && (
                        <Input
                            name="firstName"
                            label={fields?.firstName?.label || 'First Name'}
                            placeholder={fields?.firstName?.placeholder || 'Enter your first name'}
                            value={values.firstName || ''}
                            onChangeText={handleChange('firstName')}
                            onBlur={() => handleBlur('firstName')}
                            error={errors.firstName}
                            touched={touched.firstName}
                            autoCapitalize="words"
                            styles={customStyles}
                            icon={fields?.firstName?.icon || <UserIcon size={20} color="#9ca3af" />}
                            iconPosition={fields?.firstName?.iconPosition}
                            iconStyle={fields?.firstName?.iconStyle}
                            placeholderStyle={fields?.firstName?.placeholderStyle}
                            iconSource={fields?.firstName?.iconSource || iconSource}
                        />
                    )}

                    {isFieldVisible('lastName') && (
                        <Input
                            name="lastName"
                            label={fields?.lastName?.label || 'Last Name'}
                            placeholder={fields?.lastName?.placeholder || 'Enter your last name'}
                            value={values.lastName || ''}
                            onChangeText={handleChange('lastName')}
                            onBlur={() => handleBlur('lastName')}
                            error={errors.lastName}
                            touched={touched.lastName}
                            autoCapitalize="words"
                            styles={customStyles}
                            icon={fields?.lastName?.icon || <UserIcon size={20} color="#9ca3af" />}
                            iconPosition={fields?.lastName?.iconPosition}
                            iconStyle={fields?.lastName?.iconStyle}
                            placeholderStyle={fields?.lastName?.placeholderStyle}
                            iconSource={fields?.lastName?.iconSource || iconSource}
                        />
                    )}

                    {isFieldVisible('username') && (
                        <Input
                            name="username"
                            label={fields?.username?.label || 'Username'}
                            placeholder={fields?.username?.placeholder || 'Choose a username'}
                            value={values.username || ''}
                            onChangeText={handleChange('username')}
                            onBlur={() => handleBlur('username')}
                            error={errors.username}
                            touched={touched.username}
                            autoCapitalize="none"
                            styles={customStyles}
                            icon={fields?.username?.icon || <UserIcon size={20} color="#9ca3af" />}
                            iconPosition={fields?.username?.iconPosition}
                            iconStyle={fields?.username?.iconStyle}
                            placeholderStyle={fields?.username?.placeholderStyle}
                            iconSource={fields?.username?.iconSource || iconSource}
                        />
                    )}

                    {isFieldVisible('email') && (
                        <Input
                            name="email"
                            label={fields?.email?.label || 'Email'}
                            placeholder={fields?.email?.placeholder || 'Enter your email'}
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={() => handleBlur('email')}
                            error={errors.email}
                            touched={touched.email}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            styles={customStyles}
                            icon={fields?.email?.icon || <MailIcon size={20} color="#9ca3af" />}
                            iconPosition={fields?.email?.iconPosition}
                            iconStyle={fields?.email?.iconStyle}
                            placeholderStyle={fields?.email?.placeholderStyle}
                            iconSource={fields?.email?.iconSource || iconSource}
                        />
                    )}

                    {isFieldVisible('phone') && (
                        <PhoneInput
                            name="phone"
                            label={fields?.phone?.label || 'Phone Number'}
                            placeholder={fields?.phone?.placeholder || 'Enter your phone number'}
                            value={values.phone || ''}
                            onChangeText={handleChange('phone')}
                            onBlur={() => handleBlur('phone')}
                            error={errors.phone}
                            touched={touched.phone}
                            styles={customStyles}
                            phoneConfig={fields?.phone as PhoneFieldConfig}
                            icon={fields?.phone?.icon || <PhoneIcon size={20} color="#9ca3af" />}
                            iconPosition={fields?.phone?.iconPosition}
                            iconStyle={fields?.phone?.iconStyle}
                            placeholderStyle={fields?.phone?.placeholderStyle}
                            iconSource={fields?.phone?.iconSource || iconSource}
                        />
                    )}

                    {isFieldVisible('password') && (
                        <Input
                            name="password"
                            label={fields?.password?.label || 'Password'}
                            placeholder={fields?.password?.placeholder || 'Enter your password'}
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={() => handleBlur('password')}
                            error={errors.password}
                            touched={touched.password}
                            secureTextEntry
                            autoComplete="password"
                            styles={customStyles}
                            icon={fields?.password?.icon || <LockIcon size={20} color="#9ca3af" />}
                            iconPosition={fields?.password?.iconPosition}
                            iconStyle={fields?.password?.iconStyle}
                            placeholderStyle={fields?.password?.placeholderStyle}
                            iconSource={fields?.password?.iconSource || iconSource}
                        />
                    )}

                    {mode === 'signin' && forgotPassword?.enabled !== false && forgotPassword?.onPress && (
                        <View style={[styles.forgotPasswordContainer, forgotPassword.style]}>
                            <TouchableOpacity onPress={forgotPassword.onPress}>
                                <Text style={[styles.forgotPasswordText, forgotPassword.textStyle]}>
                                    {forgotPassword.text || 'Forgot Password?'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {isFieldVisible('confirmPassword') && (
                        <Input
                            name="confirmPassword"
                            label={fields?.confirmPassword?.label || 'Confirm Password'}
                            placeholder={fields?.confirmPassword?.placeholder || 'Confirm your password'}
                            value={values.confirmPassword || ''}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={() => handleBlur('confirmPassword')}
                            error={errors.confirmPassword}
                            touched={touched.confirmPassword}
                            secureTextEntry
                            styles={customStyles}
                            icon={fields?.confirmPassword?.icon || <LockIcon size={20} color="#9ca3af" />}
                            iconPosition={fields?.confirmPassword?.iconPosition}
                            iconStyle={fields?.confirmPassword?.iconStyle}
                            placeholderStyle={fields?.confirmPassword?.placeholderStyle}
                            iconSource={fields?.confirmPassword?.iconSource || iconSource}
                        />
                    )}

                    {mode === 'signin' && showRememberMe && (
                        <Checkbox
                            label={rememberMe?.label || "Remember me"}
                            checked={values.rememberMe || false}
                            onChange={(checked) => setFieldValue('rememberMe', checked)}
                            containerStyle={rememberMe?.containerStyle}
                            checkboxStyle={rememberMe?.checkboxStyle}
                            checkboxCheckedStyle={rememberMe?.checkboxCheckedStyle}
                            checkmarkColor={rememberMe?.checkmarkColor}
                            labelStyle={rememberMe?.labelStyle}
                            linkStyle={rememberMe?.linkStyle}
                        />
                    )}

                    {mode === 'signup' && showAcceptTerms && (
                        <View>
                            <Checkbox
                                label={acceptTerms?.label || "I agree to the"}
                                linkText={acceptTerms?.linkText || "Terms & Conditions"}
                                checked={values.acceptTerms || false}
                                onChange={(checked) => setFieldValue('acceptTerms', checked)}
                                onLinkPress={acceptTerms?.onLinkPress}
                                containerStyle={acceptTerms?.containerStyle}
                                checkboxStyle={acceptTerms?.checkboxStyle}
                                checkboxCheckedStyle={acceptTerms?.checkboxCheckedStyle}
                                checkmarkColor={acceptTerms?.checkmarkColor}
                                labelStyle={acceptTerms?.labelStyle || customStyles?.checkboxLabel}
                                linkStyle={acceptTerms?.linkStyle || customStyles?.checkboxLink}
                            />
                            {touched.acceptTerms && errors.acceptTerms && (
                                <Text style={styles.checkboxError}>{errors.acceptTerms}</Text>
                            )}
                        </View>
                    )}

                    <View style={styles.submitContainer}>
                        {submitButton?.component ? (
                            submitButton.component({
                                onPress: () => {
                                    submitButton.onPress?.();
                                    formikSubmit();
                                },
                                isLoading: isLoading || isSubmitting,
                                disabled: isLoading || isSubmitting,
                                title: submitButton?.text || submitButtonText || (mode === 'signin' ? 'Sign In' : 'Create Account'),
                            })
                        ) : (
                            <SubmitButton
                                onPress={() => {
                                    submitButton?.onPress?.();
                                    formikSubmit();
                                }}
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
            )}
        </Formik>
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

export default FormikForm;
