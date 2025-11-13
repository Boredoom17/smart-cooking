// components/ui/Toast.tsx
import { View, Text } from "react-native";
import { theme } from "@/lib/theme";

type ToastProps = {
  message: string | null;
};

export default function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <View
      style={{
        position: "absolute",
        bottom: 30,
        alignSelf: "center",
        backgroundColor: theme.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.border,
        paddingHorizontal: 16,
        paddingVertical: 10,
      }}
    >
      <Text style={{ color: theme.text }}>{message}</Text>
    </View>
  );
}
