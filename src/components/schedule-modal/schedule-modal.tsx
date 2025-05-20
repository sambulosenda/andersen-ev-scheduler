import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Schedule, ScheduleType, Day } from '../../types';
import {DaySelector} from '../day-selector/day-selector';
import { styles } from './schedule-modal.styles';
import { COLORS } from '@/constants/colors';
import { TimeInput } from '../time-input/time-input';



interface ScheduleModalProps {
  visible: boolean;
  onClose: () => void;
  schedule: Schedule | null;
  onSave: (schedule: Omit<Schedule, 'user_id' | 'id'>) => Promise<void>;
  loading: boolean;
}

const defaultSchedule: Omit<Schedule, 'user_id'> = {
  name: '',
  schedule_type: 'time',
  days: ['mon', 'tue', 'wed', 'thu', 'fri'],
  start_time: '08:00',
  end_time: '17:00',
  ready_by_time: '08:00',
  desired_charge_level: 80,
  ready_by_time_mileage: '08:00',
  desired_mileage: 150,
};

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  visible,
  onClose,
  schedule,
  onSave,
  loading,
}) => {
  const [formData, setFormData] = useState<Omit<Schedule, 'user_id'>>(defaultSchedule);
  const [activeType, setActiveType] = useState<ScheduleType>('time');

  // Reset form when modal is opened
  useEffect(() => {
    if (visible) {
      if (schedule) {
        // Edit mode - load schedule data
        setFormData({
          ...schedule,
          user_id: undefined, // Remove user_id as it's handled separately
        });
        setActiveType(schedule.schedule_type);
      } else {
        // Add mode - reset to defaults
        setFormData(defaultSchedule);
        setActiveType('time');
      }
    }
  }, [visible, schedule]);

  const handleInputChange = (key: keyof Omit<Schedule, 'user_id'>, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleTypeChange = (type: ScheduleType) => {
    setActiveType(type);
    handleInputChange('schedule_type', type);
  };

  const handleDaysChange = (days: Day[]) => {
    handleInputChange('days', days);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter a schedule name');
      return false;
    }

    if (formData.days.length === 0) {
      Alert.alert('Error', 'Please select at least one day');
      return false;
    }

    switch (activeType) {
      case 'time':
        if (!formData.start_time || !formData.end_time) {
          Alert.alert('Error', 'Please set start and end times');
          return false;
        }
        break;
      case 'charge':
        if (!formData.ready_by_time) {
          Alert.alert('Error', 'Please set ready by time');
          return false;
        }
        if (formData.desired_charge_level === undefined || 
            formData.desired_charge_level < 0 || 
            formData.desired_charge_level > 100) {
          Alert.alert('Error', 'Please set a valid charge level (0-100%)');
          return false;
        }
        break;
      case 'mileage':
        if (!formData.ready_by_time_mileage) {
          Alert.alert('Error', 'Please set ready by time');
          return false;
        }
        if (formData.desired_mileage === undefined || 
            formData.desired_mileage < 0 || 
            formData.desired_mileage > 250) {
          Alert.alert('Error', 'Please set a valid mileage (0-250 mi)');
          return false;
        }
        break;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to save schedule');
    }
  };

  const renderScheduleTypeContent = () => {
    switch (activeType) {
      case 'time':
        return (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Set Charging Time</Text>
            
            <View style={styles.row}>
              <View style={styles.halfColumn}>
                <Text style={styles.inputLabel}>Start Time</Text>
                <TimeInput
                  value={formData.start_time || ''}
                  onChange={(value) => handleInputChange('start_time', value)}
                  accessibilityLabel="Start time input"
                />
              </View>
              
              <View style={styles.halfColumn}>
                <Text style={styles.inputLabel}>End Time</Text>
                <TimeInput
                  value={formData.end_time || ''}
                  onChange={(value) => handleInputChange('end_time', value)}
                  accessibilityLabel="End time input"
                />
              </View>
            </View>
          </View>
        );
        
      case 'charge':
        return (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Set Charge Level</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Ready By Time</Text>
              <TimeInput
                value={formData.ready_by_time || ''}
                onChange={(value) => handleInputChange('ready_by_time', value)}
                accessibilityLabel="Ready by time input"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Desired Charge Level (%)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={formData.desired_charge_level?.toString() || ''}
                onChangeText={(value) => {
                  const numValue = parseInt(value || '0', 10);
                  handleInputChange('desired_charge_level', 
                    isNaN(numValue) ? 0 : Math.min(100, Math.max(0, numValue))
                  );
                }}
                placeholder="0-100"
                maxLength={3}
                accessibilityLabel="Desired charge level input"
              />
            </View>
          </View>
        );
        
      case 'mileage':
        return (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Set Target Mileage</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Ready By Time</Text>
              <TimeInput
                value={formData.ready_by_time_mileage || ''}
                onChange={(value) => handleInputChange('ready_by_time_mileage', value)}
                accessibilityLabel="Ready by time input"
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Desired Mileage (mi)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={formData.desired_mileage?.toString() || ''}
                onChangeText={(value) => {
                  const numValue = parseInt(value || '0', 10);
                  handleInputChange('desired_mileage', 
                    isNaN(numValue) ? 0 : Math.min(250, Math.max(0, numValue))
                  );
                }}
                placeholder="0-250"
                maxLength={3}
                accessibilityLabel="Desired mileage input"
              />
            </View>
          </View>
        );
        
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {schedule ? 'Edit Schedule' : 'Add Schedule'}
              </Text>
              <TouchableOpacity onPress={onClose} accessibilityLabel="Close modal">
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalContent}>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Schedule Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  placeholder="Enter schedule name"
                  accessibilityLabel="Schedule name input"
                />
              </View>
              
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Schedule Type</Text>
                <View style={styles.typeSelector}>
                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      activeType === 'time' && styles.typeButtonActive,
                    ]}
                    onPress={() => handleTypeChange('time')}
                    accessibilityLabel="Time based schedule type"
                    accessibilityRole="button"
                  >
                    <Ionicons
                      name="time-outline"
                      size={22}
                      color={activeType === 'time' ? COLORS.white : COLORS.primary}
                    />
                    <Text
                      style={[
                        styles.typeButtonText,
                        activeType === 'time' && styles.typeButtonTextActive,
                      ]}
                    >
                      Time
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      activeType === 'charge' && styles.typeButtonActive,
                    ]}
                    onPress={() => handleTypeChange('charge')}
                    accessibilityLabel="Charge level based schedule type"
                    accessibilityRole="button"
                  >
                    <Ionicons
                      name="battery-charging-outline"
                      size={22}
                      color={activeType === 'charge' ? COLORS.white : COLORS.primary}
                    />
                    <Text
                      style={[
                        styles.typeButtonText,
                        activeType === 'charge' && styles.typeButtonTextActive,
                      ]}
                    >
                      Charge
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.typeButton,
                      activeType === 'mileage' && styles.typeButtonActive,
                    ]}
                    onPress={() => handleTypeChange('mileage')}
                    accessibilityLabel="Mileage based schedule type"
                    accessibilityRole="button"
                  >
                    <Ionicons
                      name="speedometer-outline"
                      size={22}
                      color={activeType === 'mileage' ? COLORS.white : COLORS.primary}
                    />
                    <Text
                      style={[
                        styles.typeButtonText,
                        activeType === 'mileage' && styles.typeButtonTextActive,
                      ]}
                    >
                      Mileage
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Schedule Days</Text>
                <DaySelector
                  selectedDays={formData.days}
                  onChange={handleDaysChange}
                />
              </View>
              
              {renderScheduleTypeContent()}
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={onClose}
                accessibilityLabel="Cancel button"
                accessibilityRole="button"
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
                disabled={loading}
                accessibilityLabel="Save button"
                accessibilityRole="button"
              >
                <Text style={styles.saveButtonText}>
                  {loading ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
