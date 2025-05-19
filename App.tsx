// App.tsx
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";

import RootNavigator from "./src/navigation/RootNavigator";
import { initDatabase } from "./src/database/database";

export default function App() {
  // Initialize database on app start
  useEffect(() => {
    initDatabase()
      .then(() => console.log("Database initialized"))
      .catch((error) =>
        console.error("Database initialization failed:", error)
      );
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
