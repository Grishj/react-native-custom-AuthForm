# react-native-custom-form

A highly customizable authentication form component for React Native with multiple validation library support, social logins, and biometric authentication.

## ✨ Features

- 🔐 **Multiple Validation Libraries** - Formik + Yup, React Hook Form + Yup, React Hook Form + Zod
- 🔄 **Sign In / Sign Up Modes** - Seamless switching between authentication modes
- 📱 **Social Login** - Google, Apple, Facebook, Twitter, GitHub with horizontal button layout
- 👆 **Biometric Auth** - Fingerprint & Face ID support
- 🌍 **Country Code Picker** - Built-in phone field with country selector (40+ countries)
- 🎨 **Fully Customizable** - Style every component, use custom buttons, logos, and more
- ✅ **Form Validation** - Built-in email, password strength, and phone validation
- 🔒 **Forgot Password** - Integrated forgot password flow
- 📝 **TypeScript** - Full type safety with comprehensive interfaces

---

## 📦 Installation

```bash
npm install react-native-custom-form
# or
yarn add react-native-custom-form
```

### Peer Dependencies

```bash
npm install react react-native
```

---

## 🚀 Quick Start

### 1. Basic Sign In Form

The simplest way to add an authentication form:

```tsx
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthForm } from 'react-native-custom-form';
import type { AuthFormData } from 'react-native-custom-form';

export default function App() {
  const handleSubmit = (data: AuthFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthForm
        mode="signin"
        validationType="formik-yup"
        onSubmit={handleSubmit}
        header={{
          title: 'Sign In',
          subtitle: 'Sign in to continue',
        }}
      />
    </SafeAreaView>
  );
}
```

> **Important:** Make sure to add `style={{ flex: 1 }}` to your container so the form displays properly.

### 2. With Custom Header

```tsx
<AuthForm
  mode="signin"
  validationType="formik-yup"
  onSubmit={handleSubmit}
  header={{
    title: '👋 Welcome Back',
    subtitle: 'Sign in to access your account',
  }}
/>
```

### 2b. With App Logo

You can add your app logo to the header in two ways:

**Simple Logo (ReactNode):**

```tsx
import { Image } from 'react-native';

<AuthForm
  mode="signin"
  validationType="formik-yup"
  onSubmit={handleSubmit}
  header={{
    logo: (
      <Image
        source={require('./assets/logo.png')}
        style={{ width: 80, height: 80 }}
        resizeMode="contain"
      />
    ),
    title: 'Welcome Back',
    subtitle: 'Sign in to continue',
  }}
/>
```

**Responsive Logo (with size configuration):**

The logo automatically scales based on screen size - smaller on compact devices, larger on tablets:

```tsx
<AuthForm
  mode="signin"
  validationType="formik-yup"
  onSubmit={handleSubmit}
  header={{
    logo: {
      source: (
        <Image
          source={require('./assets/logo.png')}
          style={{ width: '100%', height: '100%' }}
          resizeMode="contain"
        />
      ),
      size: 80,  // Base size (scales responsively)
      // Or use explicit dimensions:
      // width: 100,
      // height: 60,
    },
    title: 'My App',
    subtitle: 'Sign in to your account',
  }}
/>
```


### 3. Sign Up Form with Additional Fields

```tsx
<AuthForm
  mode="signup"
  validationType="rhf-zod"
  onSubmit={handleSubmit}
  header={{
    title: '🚀 Get Started',
    subtitle: 'Create your account in seconds',
  }}
  fields={{
    firstName: { visible: true },
    lastName: { visible: true },
    phone: { visible: true, placeholder: '+1 (555) 000-0000' },
  }}
/>
```

---

## 🔥 Intermediate Examples

### 4. Toggle Between Sign In & Sign Up

```tsx
import React, { useState } from 'react';
import { AuthForm, AuthMode } from 'react-native-custom-form';

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('signin');

  return (
    <AuthForm
      mode={mode}
      validationType="rhf-yup"
      onSubmit={handleSubmit}
      onModeChange={(newMode) => setMode(newMode)}
      header={{
        title: mode === 'signin' ? 'Welcome Back' : 'Create Account',
        subtitle: mode === 'signin' 
          ? 'Sign in to continue' 
          : 'Join us today',
      }}
    />
  );
}
```

### 5. With Social Logins

Social buttons appear in a horizontal row with pill-shaped styling:

```tsx
<AuthForm
  mode="signin"
  validationType="formik-yup"
  onSubmit={handleSubmit}
  socialLogins={[
    {
      provider: 'google',
      onPress: () => handleGoogleLogin(),
    },
    {
      provider: 'facebook',
      onPress: () => handleFacebookLogin(),
    },
    {
      provider: 'apple',
      onPress: () => handleAppleLogin(),
    },
  ]}
/>
```

### 6. With Forgot Password

The "Forgot Password?" link automatically appears **below the password field** (right-aligned) when you provide `onForgotPassword`:

```tsx
<AuthForm
  mode="signin"
  validationType="formik-yup"
  onSubmit={handleSubmit}
  // Top-level prop (recommended)
  onForgotPassword={() => navigation.navigate('ForgotPassword')}
/>
```

> **Note:** `onForgotPassword` can also be passed via `footer.onForgotPassword` for backward compatibility, but the top-level prop is preferred.

### 6b. Phone Field with Country Code Picker

Add a phone field with an optional country code picker:

```tsx
<AuthForm
  mode="signup"
  validationType="formik-yup"
  onSubmit={handleSubmit}
  fields={{
    phone: {
      visible: true,
      placeholder: '(555) 000-0000',
      countryPicker: {
        enabled: true,         // Enable the country picker (disabled by default)
        defaultCountry: 'US',  // ISO country code
      },
    },
  }}
/>
```

> **Note:** The country picker is disabled by default. Set `countryPicker.enabled: true` to show it.

### 7. With Loading State & API Errors

```tsx
const [isLoading, setIsLoading] = useState(false);
const [apiError, setApiError] = useState<string>();

const handleSubmit = async (data) => {
  setIsLoading(true);
  setApiError(undefined);
  
  try {
    await api.login(data);
  } catch (error) {
    setApiError('Invalid email or password');
  } finally {
    setIsLoading(false);
  }
};

<AuthForm
  mode="signin"
  validationType="formik-yup"
  onSubmit={handleSubmit}
  isLoading={isLoading}
  apiError={apiError}
/>
```

---

## 🎯 Advanced Examples

### 8. Biometric Authentication

```tsx
import { Alert } from 'react-native';

<AuthForm
  mode="signin"
  validationType="formik-yup"
  onSubmit={handleSubmit}
  biometric={{
    enabled: true,
    type: 'fingerprint', // 'fingerprint' | 'faceId' | 'both'
    onAuthenticate: async () => {
      // Integrate with expo-local-authentication or react-native-biometrics
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        // Handle successful biometric auth
      }
    },
    promptMessage: 'Sign in with Fingerprint',
  }}
/>
```

### 9. Full Customization with Styles

```tsx
<AuthForm
  mode="signin"
  validationType="formik-yup"
  onSubmit={handleSubmit}
  header={{
    title: 'Welcome',
    subtitle: 'Sign in to your account',
  }}
  styles={{
    // Container
    container: { 
      backgroundColor: '#0f172a',
    },
    // Header
    headerTitle: { 
      fontSize: 36, 
      fontWeight: '800',
      color: '#ffffff',
    },
    headerSubtitle: { 
      fontSize: 16, 
      color: '#94a3b8',
    },
    // Inputs
    inputContainer: {
      backgroundColor: '#1e293b',
      borderRadius: 12,
    },
    input: { 
      color: '#ffffff',
    },
    inputLabel: { 
      color: '#e2e8f0',
    },
    inputError: {
      color: '#f87171',
    },
    // Button
    button: { 
      backgroundColor: '#6366f1',
      borderRadius: 14,
      height: 56,
    },
    buttonText: { 
      fontWeight: '700',
      fontSize: 16,
    },
    // Footer
    footerText: { 
      color: '#94a3b8',
    },
    footerLink: { 
      color: '#818cf8',
    },
  }}
/>
```

### 9b. Custom Submit Button

Customize the submit button or use your own component:

**Style the default button:**

```tsx
<AuthForm
  mode="signin"
  validationType="formik-yup"
  onSubmit={handleSubmit}
  submitButton={{
    text: 'Login Now',
    style: { backgroundColor: '#000000', borderRadius: 8 },
    textStyle: { fontWeight: 'bold', fontSize: 18 },
  }}
/>
```

**Use your own button component:**

```tsx
<AuthForm
  mode="signin"
  validationType="formik-yup"
  onSubmit={handleSubmit}
  submitButton={{
    component: ({ onPress, isLoading, title }) => (
      <MyCustomButton
        onPress={onPress}
        loading={isLoading}
        label={title}
      />
    ),
  }}
/>
```

### 10. Custom Field Labels & Placeholders

```tsx
<AuthForm
  mode="signup"
  validationType="rhf-zod"
  onSubmit={handleSubmit}
  fields={{
    email: {
      label: 'Work Email',
      placeholder: 'you@company.com',
    },
    password: {
      label: 'Create Password',
      placeholder: 'Min. 8 characters',
    },
    confirmPassword: {
      label: 'Repeat Password',
      placeholder: 'Enter password again',
    },
    firstName: {
      visible: true,
      label: 'First Name',
      placeholder: 'John',
    },
    lastName: {
      visible: true,
      label: 'Last Name',
      placeholder: 'Doe',
    },
  }}
/>
```

### 11. With Initial Values (Edit Profile / Pre-fill)

```tsx
<AuthForm
  mode="signin"
  validationType="formik-yup"
  onSubmit={handleSubmit}
  initialValues={{
    email: 'user@example.com',
    rememberMe: true,
  }}
/>
```

### 12. Complete Full-Featured Example

```tsx
import React, { useState } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { AuthForm, AuthFormData, AuthMode, ValidationType } from 'react-native-custom-form';

export default function AuthScreen() {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string>();

  const handleSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    setApiError(undefined);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      Alert.alert('Success', `Welcome, ${data.email}!`);
    } catch (error) {
      setApiError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    Alert.alert('Social Login', `${provider} selected`);
  };

  const handleBiometric = async () => {
    Alert.alert('Biometric', 'Authenticating...');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
      <AuthForm
        mode={mode}
        validationType="rhf-zod"
        onSubmit={handleSubmit}
        onModeChange={setMode}
        isLoading={isLoading}
        apiError={apiError}
        header={{
          title: mode === 'signin' ? '👋 Welcome Back' : '🚀 Get Started',
          subtitle: mode === 'signin'
            ? 'Sign in to access your account'
            : 'Create your account in seconds',
        }}
        footer={{
          onForgotPassword: () => Alert.alert('Forgot Password'),
          onTermsPress: () => Alert.alert('Terms of Service'),
          onPrivacyPress: () => Alert.alert('Privacy Policy'),
        }}
        fields={{
          firstName: { visible: mode === 'signup' },
          lastName: { visible: mode === 'signup' },
          phone: { visible: false },
          username: { visible: false },
        }}
        biometric={{
          enabled: mode === 'signin',
          type: 'fingerprint',
          onAuthenticate: handleBiometric,
          promptMessage: 'Sign in with Fingerprint',
        }}
        socialLogins={[
          { provider: 'google', onPress: () => handleSocialLogin('Google') },
          { provider: 'apple', onPress: () => handleSocialLogin('Apple') },
        ]}
        showRememberMe={mode === 'signin'}
        showAcceptTerms={mode === 'signup'}
        styles={{
          container: { backgroundColor: '#f8fafc' },
          headerTitle: { fontSize: 32, fontWeight: '800', color: '#1e293b' },
          headerSubtitle: { fontSize: 16, color: '#64748b' },
          button: { backgroundColor: '#6366f1', borderRadius: 14, height: 56 },
        }}
      />
    </SafeAreaView>
  );
}
```

---

## 🔀 Using ForgotPasswordForm

A standalone forgot password form component:

```tsx
import { ForgotPasswordForm } from 'react-native-custom-form';

<ForgotPasswordForm
  onSubmit={(email) => {
    console.log('Reset password for:', email);
  }}
  onBackToLogin={() => navigation.goBack()}
  successMessage="We've sent you an email with reset instructions."
/>
```

---

## 📋 Props Reference

### AuthFormProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | `'signin' \| 'signup'` | **required** | Authentication mode |
| `validationType` | `'formik-yup' \| 'rhf-yup' \| 'rhf-zod'` | **required** | Validation library |
| `onSubmit` | `(data: AuthFormData) => void` | **required** | Form submit handler |
| `onModeChange` | `(mode: AuthMode) => void` | - | Mode toggle callback |
| `header` | `{ title?, subtitle?, logo? }` | - | Header configuration |
| `footer` | `FooterConfig` | - | Footer configuration |
| `fields` | `FieldsConfig` | - | Field visibility/config |
| `socialLogins` | `SocialLoginConfig[]` | - | Social login buttons |
| `biometric` | `BiometricConfig` | - | Biometric auth config |
| `styles` | `AuthFormStyles` | - | Custom styling |
| `isLoading` | `boolean` | `false` | Show loading state |
| `apiError` | `string` | - | Display API error |
| `submitButtonText` | `string` | Auto | Custom button text |
| `showRememberMe` | `boolean` | `true` | Show remember me (signin) |
| `showAcceptTerms` | `boolean` | `true` | Show terms checkbox (signup) |
| `initialValues` | `Partial<AuthFormData>` | - | Pre-fill form values |
| `onForgotPassword` | `() => void` | - | Forgot password callback |
| `submitButton` | `SubmitButtonConfig` | - | Custom submit button config |

### AuthFormData

```typescript
interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  username?: string;
  rememberMe?: boolean;
  acceptTerms?: boolean;
}
```

### BiometricConfig

```typescript
interface BiometricConfig {
  enabled: boolean;
  type?: 'fingerprint' | 'faceId' | 'both';
  onAuthenticate: () => void | Promise<void>;
  promptMessage?: string;
}
```

### LogoConfig

For responsive app logos in the header:

```typescript
interface LogoConfig {
  source: ReactNode;       // Your logo component (Image, SVG, etc.)
  size?: number;           // Uniform size (responsive by default)
  width?: number;          // Explicit width
  height?: number;         // Explicit height
  style?: ViewStyle;       // Additional container styling
}
```

**Responsive Behavior:**
- **Small screens** (< 375px): Logo scales down to 60px
- **Medium screens** (375-428px): Logo uses 72px  
- **Large screens** (> 428px): Logo uses 80px or your specified size

### SocialLoginConfig

```typescript
interface SocialLoginConfig {
  provider: 'google' | 'apple' | 'facebook' | 'twitter' | 'github';
  onPress: () => void | Promise<void>;
  disabled?: boolean;
  iconComponent?: ReactNode;  // Custom icon
  label?: string;             // Custom label
}
```

### AuthFormStyles

```typescript
interface AuthFormStyles {
  container?: ViewStyle;
  header?: ViewStyle;
  headerTitle?: TextStyle;
  headerSubtitle?: TextStyle;
  logoContainer?: ViewStyle;     // Logo container styling
  body?: ViewStyle;
  inputContainer?: ViewStyle;
  input?: TextStyle;
  inputLabel?: TextStyle;
  inputError?: TextStyle;
  button?: ViewStyle;
  buttonText?: TextStyle;
  buttonDisabled?: ViewStyle;
  footer?: ViewStyle;
  footerText?: TextStyle;
  footerLink?: TextStyle;
  socialButtonsContainer?: ViewStyle;
  socialButton?: ViewStyle;
}
```

### CountryPickerConfig

Configuration for the phone field country code picker:

```typescript
interface CountryPickerConfig {
  enabled: boolean;              // Enable/disable country picker
  defaultCountry?: string;       // ISO country code (e.g., 'US', 'NP')
  customComponent?: (props: {    // Use your own picker component
    selectedCountry: CountryData;
    onSelect: (country: CountryData) => void;
    visible: boolean;
    onClose: () => void;
  }) => ReactNode;
  styles?: {                     // Custom styling
    container?: ViewStyle;
    button?: ViewStyle;
    buttonText?: TextStyle;
    modalContainer?: ViewStyle;
    listItem?: ViewStyle;
    listItemText?: TextStyle;
  };
}
```

### PhoneFieldConfig

Extended configuration for phone fields:

```typescript
interface PhoneFieldConfig extends FieldConfig {
  countryPicker?: CountryPickerConfig;
}
```

### SubmitButtonConfig

Configuration for custom submit buttons:

```typescript
interface SubmitButtonConfig {
  component?: (props: {          // Custom button component
    onPress: () => void;
    isLoading: boolean;
    disabled?: boolean;
    title: string;
  }) => ReactNode;
  text?: string;                 // Button text
  style?: ViewStyle;             // Button style
  textStyle?: TextStyle;         // Text style
  disabledStyle?: ViewStyle;     // Disabled state style
}
```

### CountryData

Country information for the picker:

```typescript
interface CountryData {
  code: string;      // ISO country code (e.g., 'US', 'NP')
  name: string;      // Country name
  dialCode: string;  // Dial code (e.g., '+1', '+977')
  flag?: string;     // Emoji flag
}
```

---

## 🧩 Exported Components

Import individual components for advanced customization:

```typescript
import {
  // Main Components
  AuthForm,
  ForgotPasswordForm,
  
  // UI Components
  Header,
  Footer,
  Input,
  PhoneInput,
  CountryCodePicker,
  getCountryByCode,
  COUNTRIES,
  SocialButton,
  SocialLoginGroup,
  SubmitButton,
  Checkbox,
  
  // Form Strategies (for custom implementations)
  FormikForm,
  RHFForm,
  
  // Validation Schemas (for extension)
  getYupSchema,
  getYupSignInSchema,
  getYupSignUpSchema,
  getZodSchema,
  zodSignInSchema,
  zodSignUpSchema,
  
  // Types
  type AuthFormProps,
  type AuthFormData,
  type AuthMode,
  type ValidationType,
  type BiometricConfig,
  type SocialLoginConfig,
  type CountryData,
  type CountryPickerConfig,
  type PhoneFieldConfig,
  type SubmitButtonConfig,
} from 'react-native-custom-form';
```
example

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';

// Local Auth Package
import { AuthForm } from '../src';
import type { AuthFormData } from '../src';

export default function App() {
  const handleSubmit = (data: AuthFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#fff' }}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <AuthForm
        mode="signin"
        validationType="formik-yup"
        onSubmit={handleSubmit}

        header={{
          logo: (
            <Image
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
          ),
          title: 'Sign In',
          subtitle: 'Sign in to continue',
        }}

        fields={{
          phone: {
            visible: true,
            required: true,  // Now validates as required
            placeholder: 'Enter your phone number',
            countryPicker: { enabled: true, defaultCountry: 'NP' }
          },
        }}

        biometric={{
          enabled: true,
          type: 'fingerprint',
          onAuthenticate: () => console.log('Biometric Authenticated'),
        }}

        // Forgot Password configuration
        forgotPassword={{
          enabled: true,
          text: 'Forgot Password?',
          textStyle: { color: '#4f46e5', fontWeight: '300' },
          onPress: () => console.log('Navigate to Forgot Password screen'),
        }}

        // Custom submit button styling
        submitButton={{
          text: 'Login',
          style: { backgroundColor: '#78c14fff' },
          textStyle: { color: '#8e2424ff' },
        }}

        // Remember Me checkbox customization
        rememberMe={{
          enabled: true,
          label: 'Keep me logged in',
          labelStyle: { color: '#374151', fontWeight: '500' },
          checkboxStyle: { borderColor: '#a2a0bcff', borderWidth: 2 },
          checkboxCheckedStyle: { backgroundColor: '#4f46e5' },
          checkmarkColor: '#ffffff',
        }}

        socialLogins={[
          { provider: 'google', onPress: () => console.log('Google Login') },
          { provider: 'facebook', onPress: () => console.log('Facebook Login') },
        ]}

        footer={{
          text: "Don't have an account?",
          textLink: 'Sign Up',
          textLinkOnPress: () => console.log('Navigate to Sign Up screen'),
          textLinkStyle: { color: '#638fe5ff' },
        }}


      />
    </SafeAreaView>
  );
}



import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';

// Local Auth Package
import { AuthForm } from '../src';
import type { AuthFormData } from '../src';

export default function App() {
  const handleSubmit = (data: AuthFormData) => {
    console.log('Form submitted:', data);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#f8fafc' }}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <AuthForm
        mode="signin"
        validationType="formik-yup"
        onSubmit={handleSubmit}

        // ========================================
        // HEADER STYLING
        // ========================================
        header={{
          logo: (
            <Image
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
              style={{ width: 90, height: 90, borderRadius: 20 }}
              resizeMode="contain"
            />
          ),
          title: 'Welcome Back',
          subtitle: 'Sign in to your account',
        }}

        // ========================================
        // FIELD CONFIGURATION
        // ========================================
        fields={{
          email: {
            visible: true,
            label: 'Email Address',
            placeholder: 'you@example.com',
          },
          password: {
            visible: true,
            label: 'Password',
            placeholder: '••••••••',
          },
          phone: {
            visible: true,
            required: true,
            label: 'Phone Number',
            placeholder: 'Enter your phone',
            countryPicker: { enabled: true, defaultCountry: 'NP' },
          },
        }}

        // ========================================
        // BIOMETRIC STYLING
        // ========================================
        biometric={{
          enabled: true,
          type: 'fingerprint',
          promptMessage: 'Authenticate with biometrics',
          onAuthenticate: () => console.log('Biometric success!'),
        }}

        // ========================================
        // FORGOT PASSWORD STYLING
        // ========================================
        forgotPassword={{
          enabled: true,
          text: 'Forgot your password?',
          style: { alignItems: 'flex-end', marginTop: -8, marginBottom: 12 },
          textStyle: {
            color: '#6366f1',
            fontWeight: '600',
            fontSize: 14,
          },
          onPress: () => console.log('Forgot password pressed'),
        }}

        // ========================================
        // SUBMIT BUTTON STYLING
        // ========================================
        submitButton={{
          text: 'Sign In',
          style: {
            backgroundColor: '#6366f1',
            borderRadius: 14,
            height: 54,
            shadowColor: '#6366f1',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          },
          textStyle: {
            color: '#ffffff',
            fontSize: 17,
            fontWeight: '700',
            letterSpacing: 0.5,
          },
          disabledStyle: {
            backgroundColor: '#a5b4fc',
            shadowOpacity: 0,
          },
        }}

        // ========================================
        // REMEMBER ME CHECKBOX STYLING
        // ========================================
        rememberMe={{
          enabled: true,
          label: 'Keep me signed in',
          containerStyle: { marginVertical: 8 },
          checkboxStyle: {
            borderColor: '#c7d2fe',
            borderWidth: 2,
            borderRadius: 6,
            width: 24,
            height: 24,
          },
          checkboxCheckedStyle: {
            backgroundColor: '#6366f1',
            borderColor: '#6366f1',
          },
          checkmarkColor: '#ffffff',
          labelStyle: {
            color: '#4b5563',
            fontSize: 15,
            fontWeight: '500',
          },
        }}

        // ========================================
        // SOCIAL LOGINS STYLING
        // ========================================
        socialLogins={[
          {
            provider: 'google',
            label: 'Google',
            onPress: () => console.log('Google Login'),
          },
          {
            provider: 'apple',
            label: 'Apple',
            onPress: () => console.log('Apple Login'),
          },
          {
            provider: 'facebook',
            label: 'Facebook',
            onPress: () => console.log('Facebook Login'),
          },
        ]}

        // ========================================
        // FOOTER STYLING
        // ========================================
        footer={{
          text: "Don't have an account?",
          textLink: 'Create Account',
          textLinkOnPress: () => console.log('Navigate to Sign Up'),
          textStyle: {
            color: '#6b7280',
            fontSize: 15,
          },
          textLinkStyle: {
            color: '#6366f1',
            fontWeight: '700',
            fontSize: 15,
          },
        }}

        // ========================================
        // GLOBAL STYLES (AuthFormStyles)
        // ========================================
        styles={{
          // Main container
          container: {
            backgroundColor: '#f8fafc',
            paddingHorizontal: 0,
          },

          // Header styles
          header: {
            alignItems: 'center',
            marginBottom: 32,
          },
          logoContainer: {
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          headerTitle: {
            fontSize: 28,
            fontWeight: '800',
            color: '#1f2937',
            letterSpacing: -0.5,
          },
          headerSubtitle: {
            fontSize: 16,
            color: '#6b7280',
            marginTop: 8,
          },

          // Form body
          body: {
            paddingHorizontal: 24,
          },

          // Input field styles
          inputContainer: {
            marginBottom: 16,
          },
          input: {
            backgroundColor: '#ffffff',
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: '#e5e7eb',
            fontSize: 16,
            color: '#1f2937',
            paddingHorizontal: 16,
            height: 52,
          },
          inputLabel: {
            fontSize: 14,
            fontWeight: '600',
            color: '#374151',
            marginBottom: 8,
          },
          inputError: {
            fontSize: 13,
            color: '#ef4444',
            marginTop: 6,
          },
          // Input focus/blur border colors
          inputFocused: {
            borderColor: '#6366f1',
            borderWidth: 2,
            shadowColor: '#6366f1',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 3,
          },
          inputBlurred: {
            borderColor: '#e5e7eb',
            borderWidth: 1.5,
          },

          // Button styles (fallback if submitButton not provided)
          button: {
            backgroundColor: '#6366f1',
            borderRadius: 14,
            height: 54,
          },
          buttonText: {
            color: '#ffffff',
            fontSize: 17,
            fontWeight: '700',
          },
          buttonDisabled: {
            backgroundColor: '#a5b4fc',
          },

          // Footer styles
          footer: {
            marginTop: 24,
            alignItems: 'center',
          },
          footerText: {
            color: '#6b7280',
            fontSize: 15,
          },
          footerLink: {
            color: '#6366f1',
            fontWeight: '700',
          },

          // Social buttons styles
          socialButtonsContainer: {
            marginTop: 16,
          },
          socialButton: {
            borderRadius: 12,
            borderWidth: 1.5,
            borderColor: '#e5e7eb',
            backgroundColor: '#ffffff',
          },

          // Divider styles
          divider: {
            marginVertical: 24,
          },
          dividerText: {
            color: '#9ca3af',
            fontSize: 14,
            fontWeight: '500',
          },
        }}
      />
    </SafeAreaView>
  );
}




---

## 📄 License

MIT © 2024
