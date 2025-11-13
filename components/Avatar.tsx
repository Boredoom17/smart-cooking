// components/Avatar.tsx
import { Image, View, Text } from "react-native";
import { theme } from "@/lib/theme";

type Props = {
  uri?: string | null;
  size?: number;
  initials?: string;
};

export default function Avatar({ uri, size = 60, initials = "NS" }: Props) {
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
      />
    );
  }
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: theme.primarySoft,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: theme.primaryDark,
          fontWeight: "700",
          fontSize: size / 3,
        }}
      >
        {initials}
      </Text>
    </View>
  );
}
