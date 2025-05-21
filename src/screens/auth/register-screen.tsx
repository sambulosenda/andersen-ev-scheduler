import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useAuthStore } from "../../store/auth-store";
import { AuthScreenProps } from "../../types/navigation";
import { FormContainer } from "@/components/fom-container/form-container";
import { FormInput } from "@/components/form-input/form-input";
import { Button } from "@/components/button/button";
import { TextLink } from "@/components/text-link/text-link";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const { register, loading, error, clearError } = useAuthStore();

  const {
    control,
    handleSubmit,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Used to validate confirmPassword against password
  const password = watch("password");

  // Clear errors when component mounts or unmounts
  useEffect(() => {
    clearError();
    return () => clearError();
  }, []);

  const onSubmit = async (data: FormData) => {
    await register(data.username, data.password, data.email || undefined);
  };

  return (
    <FormContainer title="Create an Account" error={error}>
      <FormInput<FormData>
        name="username"
        control={control}
        label="Username"
        placeholder="Enter username"
        rules={{
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Username must be at least 3 characters",
          },
        }}
        isRequired
      />

      <FormInput<FormData>
        name="email"
        control={control}
        label="Email"
        placeholder="Enter email"
        keyboardType="email-address"
        rules={{
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
      />

      <FormInput<FormData>
        name="password"
        control={control}
        label="Password"
        placeholder="Enter password"
        secureTextEntry
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        isRequired
      />

      <FormInput<FormData>
        name="confirmPassword"
        control={control}
        label="Confirm Password"
        placeholder="Confirm password"
        secureTextEntry
        rules={{
          required: "Please confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        }}
        isRequired
      />

      <Button title="Register" onPress={handleSubmit(onSubmit)} loading={loading} />

      <TextLink
        text="Already have an account?"
        boldText="Login"
        onPress={() => navigation.navigate("Login")}
      />
    </FormContainer>
  );
};
