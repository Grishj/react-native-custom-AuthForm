import * as Yup from 'yup';
import { z } from 'zod';
import { AuthMode, FieldsConfig } from '../types';

// ============================================================================
// Yup Validation Schemas
// ============================================================================

export const getYupSignInSchema = (fieldsConfig?: FieldsConfig) => {
    const schema: Record<string, Yup.AnySchema> = {
        email: Yup.string()
            .email('Please enter a valid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
        rememberMe: Yup.boolean(),
    };

    // Add phone validation if it's visible and required
    if (fieldsConfig?.phone?.visible) {
        const phoneValidation = Yup.string().matches(
            /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
            'Please enter a valid phone number'
        );
        schema.phone = fieldsConfig.phone.required
            ? phoneValidation.required('Phone number is required')
            : phoneValidation;
    }

    // Add other fields if visible and required
    if (fieldsConfig?.firstName?.visible && fieldsConfig.firstName.required) {
        schema.firstName = Yup.string()
            .min(2, 'First name must be at least 2 characters')
            .required('First name is required');
    }

    if (fieldsConfig?.lastName?.visible && fieldsConfig.lastName.required) {
        schema.lastName = Yup.string()
            .min(2, 'Last name must be at least 2 characters')
            .required('Last name is required');
    }

    if (fieldsConfig?.username?.visible && fieldsConfig.username.required) {
        schema.username = Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
            .required('Username is required');
    }

    return Yup.object().shape(schema);
};

export const getYupSignUpSchema = (fieldsConfig?: FieldsConfig) => {
    const schema: Record<string, Yup.AnySchema> = {
        email: Yup.string()
            .email('Please enter a valid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            )
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Please confirm your password'),
        firstName: Yup.string().min(2, 'First name must be at least 2 characters'),
        lastName: Yup.string().min(2, 'Last name must be at least 2 characters'),
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
        acceptTerms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
    };

    // Phone validation - check if required
    const phoneValidation = Yup.string().matches(
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
        'Please enter a valid phone number'
    );
    schema.phone = fieldsConfig?.phone?.required
        ? phoneValidation.required('Phone number is required')
        : phoneValidation;

    // Override firstName if required
    if (fieldsConfig?.firstName?.required) {
        schema.firstName = Yup.string()
            .min(2, 'First name must be at least 2 characters')
            .required('First name is required');
    }

    // Override lastName if required
    if (fieldsConfig?.lastName?.required) {
        schema.lastName = Yup.string()
            .min(2, 'Last name must be at least 2 characters')
            .required('Last name is required');
    }

    // Override username if required
    if (fieldsConfig?.username?.required) {
        schema.username = Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
            .required('Username is required');
    }

    return Yup.object().shape(schema);
};

export const getYupSchema = (mode: AuthMode, fieldsConfig?: FieldsConfig) =>
    mode === 'signin' ? getYupSignInSchema(fieldsConfig) : getYupSignUpSchema(fieldsConfig);

// ============================================================================
// Zod Validation Schemas
// ============================================================================

export const getZodSignInSchema = (fieldsConfig?: FieldsConfig) => {
    const baseSchema = z.object({
        email: z.string().email('Please enter a valid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        rememberMe: z.boolean().optional(),
        phone: fieldsConfig?.phone?.visible && fieldsConfig.phone.required
            ? z.string().regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Please enter a valid phone number')
            : z.string().regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Please enter a valid phone number').optional(),
        firstName: fieldsConfig?.firstName?.visible && fieldsConfig.firstName.required
            ? z.string().min(2, 'First name must be at least 2 characters')
            : z.string().min(2, 'First name must be at least 2 characters').optional(),
        lastName: fieldsConfig?.lastName?.visible && fieldsConfig.lastName.required
            ? z.string().min(2, 'Last name must be at least 2 characters')
            : z.string().min(2, 'Last name must be at least 2 characters').optional(),
        username: fieldsConfig?.username?.visible && fieldsConfig.username.required
            ? z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
            : z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores').optional(),
    });

    return baseSchema;
};

export const getZodSignUpSchema = (fieldsConfig?: FieldsConfig) => {
    const baseSchema = z.object({
        email: z.string().email('Please enter a valid email address'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                'Password must contain at least one uppercase letter, one lowercase letter, and one number'
            ),
        confirmPassword: z.string().min(1, 'Please confirm your password'),
        firstName: fieldsConfig?.firstName?.required
            ? z.string().min(2, 'First name must be at least 2 characters')
            : z.string().min(2, 'First name must be at least 2 characters').optional(),
        lastName: fieldsConfig?.lastName?.required
            ? z.string().min(2, 'Last name must be at least 2 characters')
            : z.string().min(2, 'Last name must be at least 2 characters').optional(),
        phone: fieldsConfig?.phone?.required
            ? z.string().regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Please enter a valid phone number')
            : z.string().regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, 'Please enter a valid phone number').optional(),
        username: fieldsConfig?.username?.required
            ? z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
            : z.string().min(3, 'Username must be at least 3 characters').regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores').optional(),
        acceptTerms: z.literal(true, {
            errorMap: () => ({ message: 'You must accept the terms and conditions' }),
        }),
    }).refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
    });

    return baseSchema;
};

// Legacy exports for backward compatibility
export const zodSignInSchema = getZodSignInSchema();
export const zodSignUpSchema = getZodSignUpSchema();

export const getZodSchema = (mode: AuthMode, fieldsConfig?: FieldsConfig) =>
    mode === 'signin' ? getZodSignInSchema(fieldsConfig) : getZodSignUpSchema(fieldsConfig);

export type YupSignInData = Yup.InferType<ReturnType<typeof getYupSignInSchema>>;
export type YupSignUpData = Yup.InferType<ReturnType<typeof getYupSignUpSchema>>;
export type ZodSignInData = z.infer<ReturnType<typeof getZodSignInSchema>>;
export type ZodSignUpData = z.infer<ReturnType<typeof getZodSignUpSchema>>;
