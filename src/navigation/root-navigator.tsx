import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image } from "react-native";
import andersenLogo from "../assets/andersen-logo.png";

import { useAuthStore } from "../store/auth-store";
import LoginScreen from "../screens/auth/login-screen";
import RegisterScreen from "../screens/auth/register-screen";
import MainTabs from "./main-tabs";
import { COLORS } from "../constants/colors";

const Stack = createStackNavigator();

const LogoTitle = () => (
  <Image
    source={andersenLogo}
    style={{ width: 100, height: 24, resizeMode: "contain" }}
  />
);

const RootNavigator = () => {
  const { user } = useAuthStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {user ? (
        // User is logged in
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      ) : (
        // User is not logged in
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerTitle: () => <LogoTitle />,
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerTitle: () => <LogoTitle />,
              headerTitleAlign: "center",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
