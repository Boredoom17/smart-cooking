// components/ui/Button.tsx
import { ReactNode } from "react";
import {
  Pressable,
  Text,
  ViewStyle,
  StyleProp,
  Animated,
} from "react-native";
import { useRef } from "react";
import { theme } from "@/lib/theme";

type Props = {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  subtle?: boolean;
  danger?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
};

export default function Button({
  title,
  onPress,
  style,
  subtle,
  danger,
  disabled,
  leftIcon,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const animate = (to: number) => {
    Animated.spring(scale, {
      toValue: to,
      useNativeDriver: true,
      friction: 6,
      tension: 120,
    }).start();
  };

  const bgColor = subtle
    ? "transparent"
    : danger
    ? theme.danger
    : theme.primary;

  const borderColor = subtle
    ? theme.border
    : danger
    ? theme.danger
    : "transparent";

  const textColor = subtle ? theme.text : "#FFFFFF";

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        onPressIn={() => animate(0.97)}
        onPressOut={() => animate(1)}
        style={({ pressed }) => ({
          opacity: pressed ? 0.9 : 1,
          backgroundColor: disabled ? "#E5E7EB" : bgColor,
          borderRadius: 999,
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderWidth: subtle ? 1 : 0,
          borderColor,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        })}
      >
        {leftIcon}
        <Text
          style={{
            color: disabled ? "#9CA3AF" : textColor,
            fontWeight: "600",
            fontSize: 14,
          }}
        >
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
