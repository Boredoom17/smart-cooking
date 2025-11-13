// app/(tabs)/settings.tsx
import { View, Text } from "react-native";
import { theme } from "@/lib/theme";

export default function SettingsScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: theme.text,
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        Settings moved into Profile ⚙️
      </Text>
    </View>
  );
}
