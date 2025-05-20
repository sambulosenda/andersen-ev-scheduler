import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useAuthStore } from "../../store/auth-store";
import { COLORS } from "../../constants/colors";

const ProfileScreen = () => {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: logout,
        style: "destructive",
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.username.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>
        <Text style={styles.username}>{user?.username}</Text>
        {user?.email && <Text style={styles.email}>{user.email}</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Ionicons
            name="battery-charging-outline"
            size={24}
            color={COLORS.primary}
          />
          <Text style={styles.menuItemText}>Charge Point Settings</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.grey} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COLORS.primary}
          />
          <Text style={styles.menuItemText}>Notification Preferences</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.grey} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Ionicons name="car-outline" size={24} color={COLORS.primary} />
          <Text style={styles.menuItemText}>Vehicle Information</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.grey} />
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Ionicons
            name="help-circle-outline"
            size={24}
            color={COLORS.primary}
          />
          <Text style={styles.menuItemText}>Help Center</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.grey} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
          <Ionicons
            name="document-text-outline"
            size={24}
            color={COLORS.primary}
          />
          <Text style={styles.menuItemText}>Terms & Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.grey} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        accessibilityLabel="Logout button"
        accessibilityRole="button"
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.white,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
  },
  email: {
    fontSize: 14,
    color: COLORS.grey,
    marginTop: 4,
  },
  section: {
    backgroundColor: COLORS.white,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.grey,
    marginVertical: 8,
    textTransform: "uppercase",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    marginLeft: 16,
  },
  logoutButton: {
    backgroundColor: COLORS.primaryButton,
    margin: 20,
    padding: 15,
    borderRadius: 40,
    alignItems: "center",
  },
  logoutText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
    paddingBottom: 40,
  },
  logoContainer: {
    marginBottom: 10,
  },
  logo: {
    width: 150,
    height: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  logoText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  versionText: {
    fontSize: 12,
    color: COLORS.grey,
  },
});

export default ProfileScreen;
