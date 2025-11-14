// components/ui/Card.tsx
import { ReactNode } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { theme } from "@/lib/theme";

export type CardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function Card({ children, style }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: theme.card,
          borderRadius: 18,
          padding: 16,
          borderWidth: 1,
          borderColor: theme.border,
          shadowColor: "#000",
          shadowOpacity: 0.04,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
