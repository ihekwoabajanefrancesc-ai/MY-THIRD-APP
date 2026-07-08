import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useStore } from "../../src/store/useStore";
import { Platform } from "react-native";

export default function TabsLayout() {
    const { isDark } = useStore();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#fa0808",
                tabBarInactiveTintColor: isDark ? "#9CA3AF" : "#6B7280",
                tabBarStyle: {
                    backgroundColor: isDark ? "#111827" : "#fff",
                    borderTopColor: isDark ? "#1F2937" : "#E5E7EB",
                    borderTopWidth: 1,
                    height: Platform.OS === "ios" ? 90 : 70,
                    paddingTop: 8,
                    paddingBottom: Platform.OS === "ios" ? 25 : 25,
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: "600",
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="attendance"
                options={{
                    title: "Attendance",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="stats-chart" size={size} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="assessment"
                options={{
                    title: "Assessment",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text" size={size} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="announcement"
                options={{
                    title: "Announcements", // plural to match screen
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications" size={size} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color}/>
                    ),
                }}
            />
        </Tabs>
    );
}

