// screens/LoginScreen.tsx
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
  password: string;
};

export const LoginScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const { login, loading, error, clearError } = useAuthStore();

  const { control, handleSubmit } = useForm<FormData>({
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
    <FormContainer title="Charging Schedule Manager" error={error}>
      <FormInput<FormData>
        name="username"
        control={control}
        label="Username"
        placeholder="Enter username"
        rules={{ required: "Username is required" }}
        isRequired
      />

      <FormInput<FormData>
        name="password"
        control={control}
        label="Password"
        placeholder="Enter password"
        secureTextEntry
        rules={{ required: "Password is required" }}
        isRequired
      />

      <Button
        title="Login"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />

      <TextLink
        text="Don't have an account?"
        boldText="Register"
        onPress={() => navigation.navigate("Register")}
      />
    </FormContainer>
  );
};
