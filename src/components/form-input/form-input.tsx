import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { COLORS } from "@/constants/colors";

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  rules?: RegisterOptions;
  isRequired?: boolean;
};

export function FormInput<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  secureTextEntry = false,
  autoCapitalize = "none",
  keyboardType = "default",
  rules = {},
  isRequired = false,
}: FormInputProps<T>) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>
        {label} {isRequired && <Text style={styles.required}>*</Text>}
      </Text>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={[styles.input, error && styles.inputError]}
              placeholder={placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              autoCapitalize={autoCapitalize}
              keyboardType={keyboardType}
              accessibilityLabel={`${label} input`}
            />
            {error && <Text style={styles.errorMessage}>{error.message}</Text>}
          </>
        )}
        name={name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});

