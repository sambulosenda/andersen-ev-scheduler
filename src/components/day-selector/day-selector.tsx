import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { Day } from "@/types";
import { styles } from "./day-selector.styles";

interface DaySelectorProps {
  selectedDays: Day[];
  onChange: (selectedDays: Day[]) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({
  selectedDays,
  onChange,
}) => {
  const days: { key: Day; label: string }[] = [
    { key: "mon", label: "M" },
    { key: "tue", label: "T" },
    { key: "wed", label: "W" },
    { key: "thu", label: "T" },
    { key: "fri", label: "F" },
    { key: "sat", label: "S" },
    { key: "sun", label: "S" },
  ];

  const toggleDay = (day: Day) => {
    if (selectedDays.includes(day)) {
      // Remove day if already selected
      onChange(selectedDays.filter((d) => d !== day));
    } else {
      // Add day if not selected
      onChange([...selectedDays, day]);
    }
  };

  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <TouchableOpacity
          key={day.key}
          style={[
            styles.dayButton,
            selectedDays.includes(day.key) && styles.dayButtonSelected,
            index === 5 || index === 6 ? styles.weekendButton : null,
          ]}
          onPress={() => toggleDay(day.key)}
          accessibilityLabel={`Select ${day.key}`}
          accessibilityRole="button"
          accessibilityState={{ selected: selectedDays.includes(day.key) }}
        >
          <Text
            style={[
              styles.dayText,
              selectedDays.includes(day.key) && styles.dayTextSelected,
            ]}
          >
            {day.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

