// components/ui/ListRow.tsx
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/lib/theme";

export type ListRowProps = {
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
};

export default function ListRow({
  title,
  subtitle,
  icon,
  onPress,
}: ListRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={theme.primaryDark}
          style={{ marginRight: 12 }}
        />
      )}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: theme.text,
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={{
              color: theme.subtext,
              fontSize: 12,
              marginTop: 2,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
      <Ionicons
        name="chevron-forward-outline"
        size={16}
        color={theme.subtext}
      />
    </Pressable>
  );
}
