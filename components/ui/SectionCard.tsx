// components/ui/SectionCard.tsx
import { ReactNode, useState } from "react";
import { View, Text, Pressable, ViewStyle, StyleProp } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/lib/theme";

export type SectionCardProps = {
  title: string;
  children?: ReactNode;
  initiallyOpen?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function SectionCard({
  title,
  children,
  initiallyOpen = true,
  style,
}: SectionCardProps) {
  const [open, setOpen] = useState(initiallyOpen);

  return (
    <View style={style}>
      <View
        style={{
          backgroundColor: theme.card,
          borderRadius: 24,
          borderWidth: 1,
          borderColor: theme.border,
          overflow: "hidden",
        }}
      >
        <Pressable
          onPress={() => setOpen((v) => !v)}
          style={({ pressed }) => ({
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 12,
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Text
            style={{
              color: theme.text,
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            {title}
          </Text>
          <Ionicons
            name={open ? "chevron-up-outline" : "chevron-down-outline"}
            size={18}
            color={theme.subtext}
          />
        </Pressable>
        {open && (
          <View style={{ paddingHorizontal: 16, paddingBottom: 14 }}>
            {children}
          </View>
        )}
      </View>
    </View>
  );
}
