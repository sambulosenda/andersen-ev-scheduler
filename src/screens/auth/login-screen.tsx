import React, { useEffect } from "react";
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
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useForm, Controller } from "react-hook-form";

import { useAuthStore } from "../../store/auth-store";
import { COLORS } from "../../constants/colors";

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

type Props = StackScreenProps<RootStackParamList, "Login">;

type FormData = {
  username: string;
  password: string;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, loading, error, clearError } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    clearError();
    return () => clearError();
  }, []);

  const onSubmit = async (data: FormData) => {
    await login(data.username, data.password);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Charging Schedule Manager</Text>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <Controller
              control={control}
              rules={{
                required: "Username is required",
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
            <Text style={styles.label}>Password</Text>
            <Controller
              control={control}
              rules={{
                required: "Password is required",
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

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            accessibilityLabel="Login button"
            accessibilityRole="button"
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => navigation.navigate("Register")}
            accessibilityLabel="Register link"
            accessibilityRole="button"
          >
            <Text style={styles.registerText}>
              Don't have an account?{" "}
              <Text style={styles.registerTextBold}>Register</Text>
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
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  logoPlaceholder: {
    width: 200,
    height: 80,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  logoText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  errorText: {
    color: COLORS.error,
    textAlign: "center",
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
  input: {
    backgroundColor: COLORS.lightGrey,
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "transparent",
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
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  registerLink: {
    marginTop: 20,
    alignItems: "center",
  },
  registerText: {
    color: COLORS.text,
    fontSize: 14,
  },
  registerTextBold: {
    fontWeight: "600",
    color: COLORS.primary,
  },
});

export default LoginScreen;
