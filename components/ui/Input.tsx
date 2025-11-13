// components/ui/Input.tsx
import { TextInput, View, Text, TextInputProps } from "react-native";
import { theme } from "@/lib/theme";

export type InputProps = TextInputProps & {
  label?: string;
};

export default function Input({ label, ...rest }: InputProps) {
  return (
    <View style={{ marginBottom: 12 }}>
      {label && (
        <Text
          style={{
            color: theme.subtext,
            fontSize: 13,
            marginBottom: 4,
          }}
        >
          {label}
        </Text>
      )}
      <TextInput
        placeholderTextColor="#9CA3AF"
        {...rest}
        style={[
          {
            backgroundColor: "#F9FAFB",
            borderRadius: 14,
            borderWidth: 1,
            borderColor: theme.border,
            paddingHorizontal: 14,
            paddingVertical: 10,
            color: theme.text,
            fontSize: 14,
          },
          rest.style,
        ]}
      />
    </View>
  );
}
