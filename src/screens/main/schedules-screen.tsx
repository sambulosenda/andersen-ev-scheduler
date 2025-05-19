import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useScheduleStore } from '../../store/scheduleStore';
import { Schedule } from '../../types';
import ScheduleItem from '../../components/schedule-item/schedule-item';
import { COLORS } from '../../constants/colors';
import {ScheduleModal} from '../../components/schedule-modal/schedule-modal';

const SchedulesScreen = () => {
  const { schedules, loading, error, loadSchedules, addSchedule, editSchedule, removeSchedule } = useScheduleStore();
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState<Schedule | null>(null);

  // Load schedules when component mounts
  useEffect(() => {
    loadSchedules();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadSchedules();
    setRefreshing(false);
  };

  const handleAddSchedule = () => {
    setCurrentSchedule(null);
    setModalVisible(true);
  };

  const handleEditSchedule = (schedule: Schedule) => {
    setCurrentSchedule(schedule);
    setModalVisible(true);
  };

  const handleDeleteSchedule = (id: number) => {
    Alert.alert(
      'Delete Schedule',
      'Are you sure you want to delete this schedule?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeSchedule(id);
            } catch (error) {
              Alert.alert('Error', 'Failed to delete schedule');
            }
          },
        },
      ]
    );
  };

  const handleSaveSchedule = async (formData: Omit<Schedule, 'user_id' | 'id'>) => {
    try {
      if (currentSchedule?.id) {
        // Edit existing schedule
        await editSchedule(currentSchedule.id, {
          ...formData,
          user_id: currentSchedule.user_id,
          id: currentSchedule.id,
        });
      } else {
        // Add new schedule (user_id will be added in store)
        await addSchedule({
          ...formData,
          user_id: 0, // Will be replaced in the store
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to save schedule');
      throw error; // Re-throw to be caught in the modal
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentSchedule(null);
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="calendar-outline" size={64} color={COLORS.grey} />
      <Text style={styles.emptyText}>No schedules yet</Text>
      <Text style={styles.emptySubText}>
        Tap the + button to create your first charging schedule
      </Text>
    </View>
  );

  // Show error if loading failed
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color={COLORS.error} />
        <Text style={styles.errorText}>Failed to load schedules</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadSchedules}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={schedules}
        keyExtractor={(item) => item.id?.toString() || ''}
        renderItem={({ item }) => (
          <ScheduleItem
            schedule={item}
            onEdit={() => handleEditSchedule(item)}
            onDelete={() => handleDeleteSchedule(item.id as number)}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddSchedule}
        activeOpacity={0.8}
        accessibilityLabel="Add schedule"
        accessibilityRole="button"
      >
        <Ionicons name="add" size={30} color={COLORS.white} />
      </TouchableOpacity>

      <ScheduleModal
        visible={modalVisible}
        onClose={closeModal}
        schedule={currentSchedule}
        onSave={handleSaveSchedule}
        loading={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
    flexGrow: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    flex: 1,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: COLORS.grey,
    textAlign: 'center',
    marginTop: 8,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: COLORS.error,
    marginTop: 16,
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default SchedulesScreen;