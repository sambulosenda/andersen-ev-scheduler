// App.tsx
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import RootNavigator from './src/navigation/root-navigator';
import { initDatabase } from './src/database/database';
import { COLORS } from './src/constants/colors';

export default function App() {
  // Initialize database on app start
  useEffect(() => {
    initDatabase()
      .then(() => console.log('Database initialized'))
      .catch(error => console.error('Database initialization failed:', error));
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style="light" backgroundColor={COLORS.primary} />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}