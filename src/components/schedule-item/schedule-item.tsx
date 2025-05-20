import React, { memo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Schedule, ScheduleType, Day } from "@/types";
import { COLORS } from "@constants/colors";
import { styles } from "./schedule-item.styles";

interface ScheduleItemProps {
  schedule: Schedule;
  onEdit: () => void;
  onDelete: () => void;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  schedule,
  onEdit,
  onDelete,
}) => {
  const getScheduleTypeIcon = (type: ScheduleType): string => {
    switch (type) {
      case "time":
        return "time-outline";
      case "charge":
        return "battery-charging-outline";
      case "mileage":
        return "speedometer-outline";
      default:
        return "calendar-outline";
    }
  };

  const formatDays = (days: Day[]): string => {
    if (days.length === 7) return "Every day";

    const dayMap: Record<Day, string> = {
      mon: "Mon",
      tue: "Tue",
      wed: "Wed",
      thu: "Thu",
      fri: "Fri",
      sat: "Sat",
      sun: "Sun",
    };

    return days.map((day) => dayMap[day]).join(", ");
  };

  const renderScheduleDetails = () => {
    switch (schedule.schedule_type) {
      case "time":
        return (
          <Text style={styles.detailText}>
            {schedule.start_time} - {schedule.end_time}
          </Text>
        );
      case "charge":
        return (
          <Text style={styles.detailText}>
            Ready by {schedule.ready_by_time} • {schedule.desired_charge_level}%
            charge
          </Text>
        );
      case "mileage":
        return (
          <Text style={styles.detailText}>
            Ready by {schedule.ready_by_time_mileage} •{" "}
            {schedule.desired_mileage} miles
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={getScheduleTypeIcon(schedule.schedule_type)}
          size={24}
          color={COLORS.primary}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.name}>{schedule.name}</Text>
        {renderScheduleDetails()}
        <Text style={styles.daysText}>{formatDays(schedule.days)}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          onPress={onEdit}
          style={styles.actionButton}
          accessibilityLabel="Edit schedule"
          accessibilityRole="button"
        >
          <Ionicons name="create-outline" size={20} color={COLORS.secondary} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onDelete}
          style={styles.actionButton}
          accessibilityLabel="Delete schedule"
          accessibilityRole="button"
        >
          <Ionicons name="trash-outline" size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// prevent unnecessary re-renders
export default memo(ScheduleItem);
