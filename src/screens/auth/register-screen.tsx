import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm, Controller } from 'react-hook-form';

import { useAuthStore } from '../../store/auth-store';
import { COLORS } from '../../constants/colors';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'Register'>;

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { register, loading, error, clearError } = useAuthStore();
  
  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  });

  // Used to validate confirmPassword against password
  const password = watch('password');

  // Clear errors when component mounts or unmounts
  useEffect(() => {
    clearError();
    return () => clearError();
  }, []);

  const onSubmit = async (data: FormData) => {
    await register(data.username, data.password, data.email || undefined);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create an Account</Text>
          
          {error && <Text style={styles.errorText}>{error}</Text>}
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username <Text style={styles.required}>*</Text></Text>
            <Controller
              control={control}
              rules={{
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.username && styles.inputError]}
                  placeholder="Enter username"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  accessibilityLabel="Username input"
                />
              )}
              name="username"
            />
            {errors.username && (
              <Text style={styles.errorMessage}>{errors.username.message}</Text>
            )}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <Controller
              control={control}
              rules={{
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  placeholder="Enter email"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  accessibilityLabel="Email input"
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text style={styles.errorMessage}>{errors.email.message}</Text>
            )}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password <Text style={styles.required}>*</Text></Text>
            <Controller
              control={control}
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.password && styles.inputError]}
                  placeholder="Enter password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  accessibilityLabel="Password input"
                />
              )}
              name="password"
            />
            {errors.password && (
              <Text style={styles.errorMessage}>{errors.password.message}</Text>
            )}
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password <Text style={styles.required}>*</Text></Text>
            <Controller
              control={control}
              rules={{
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.confirmPassword && styles.inputError]}
                  placeholder="Confirm password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  accessibilityLabel="Confirm password input"
                />
              )}
              name="confirmPassword"
            />
            {errors.confirmPassword && (
              <Text style={styles.errorMessage}>{errors.confirmPassword.message}</Text>
            )}
          </View>
          
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            accessibilityLabel="Register button"
            accessibilityRole="button"
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>Register</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
            accessibilityLabel="Login link"
            accessibilityRole="button"
          >
            <Text style={styles.loginText}>
              Already have an account? <Text style={styles.loginTextBold}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 5,
  },
  required: {
    color: COLORS.error,
  },
  input: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorMessage: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginText: {
    color: COLORS.text,
    fontSize: 14,
  },
  loginTextBold: {
    fontWeight: '600',
    color: COLORS.primary,
  },
});

export default RegisterScreen;