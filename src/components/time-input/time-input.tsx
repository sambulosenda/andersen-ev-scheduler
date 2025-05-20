import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { COLORS } from '../../constants/colors';
import { styles } from './time-input.styles';

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  accessibilityLabel?: string;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange,
  accessibilityLabel,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  // Parse the time string to Date object
  const getTimeAsDate = (): Date => {
    const date = new Date();
    if (value) {
      const [hours, minutes] = value.split(':').map(Number);
      date.setHours(hours || 0);
      date.setMinutes(minutes || 0);
    }
    return date;
  };

  // Format time as HH:MM
  const formatTime = (date: Date): string => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleTimeChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      onChange(formatTime(selectedDate));
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowPicker(true)}
        accessibilityLabel={accessibilityLabel}
      >
        <Text style={styles.timeText}>{value}</Text>
        <Ionicons name="time-outline" size={20} color={COLORS.grey} />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={getTimeAsDate()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
};

