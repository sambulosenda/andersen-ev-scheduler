import { COLORS } from "@/constants/colors";
import React, { ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

type FormContainerProps = {
  title: string;
  error?: string | null;
  children: ReactNode;
};

export const FormContainer = ({ title, error, children }: FormContainerProps) => {
  return (
    <>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>{title}</Text>
          {error && <Text style={styles.errorText}>{error}</Text>}
          {children}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </>
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
});

