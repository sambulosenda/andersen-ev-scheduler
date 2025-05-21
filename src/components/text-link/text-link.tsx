// components/TextLink.tsx
import { COLORS } from "@/constants/colors";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type TextLinkProps = {
  text: string;
  boldText: string;
  onPress: () => void;
};

export const TextLink = ({ text, boldText, onPress }: TextLinkProps) => {
  return (
    <TouchableOpacity
      style={styles.link}
      onPress={onPress}
      accessibilityLabel={`${boldText} link`}
      accessibilityRole="button"
    >
      <Text style={styles.text}>
        {text} <Text style={styles.boldText}>{boldText}</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    marginTop: 20,
    alignItems: "center",
  },
  text: {
    color: COLORS.text,
    fontSize: 14,
  },
  boldText: {
    fontWeight: "600",
    color: COLORS.primary,
  },
});

