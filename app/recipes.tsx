// app/recipes.tsx
import { View, Text, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "@/lib/theme";
import SectionCard from "@/components/ui/SectionCard";
import Button from "@/components/ui/Button";

export default function RecipesScreen() {
  const router = useRouter();
  const { label } = useLocalSearchParams<{ label?: string }>();
  const ingredient = label ?? "Ingredient";

  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <View
        style={{
          paddingTop: 18,
          paddingHorizontal: 16,
          paddingBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons
            name="arrow-back-outline"
            size={22}
            color={theme.text}
            onPress={() => router.back()}
          />
          <Text
            style={{
              color: theme.text,
              fontSize: 20,
              fontWeight: "700",
            }}
          >
            Recipes
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
      >
        {/* Ingredients summary */}
        <SectionCard title={ingredient} initiallyOpen style={{ marginBottom: 14 }}>
          <Text style={{ color: theme.subtext, fontSize: 14 }}>
            Smart suggestions built around{" "}
            <Text style={{ color: theme.text }}>{ingredient.toLowerCase()}</Text>{" "}
            and a few pantry staples.
          </Text>
        </SectionCard>

        {/* Main recipes */}
        <SectionCard
          title="Suggested recipes"
          initiallyOpen
          style={{ marginBottom: 14 }}
        >
          <RecipeRow
            title={`${ingredient} Masala Bowl`}
            subtitle="Warm bowl with spices and herbs."
            time="20 min"
          />
          <RecipeRow
            title={`${ingredient} Stir-Fry`}
            subtitle="Fast one-pan meal with mixed vegetables."
            time="18 min"
          />
          <RecipeRow
            title={`${ingredient} Wraps`}
            subtitle="Soft wraps with crunchy sides."
            time="25 min"
          />
          <View style={{ height: 10 }} />
          <Button title="Save these recipes" subtle />
        </SectionCard>

        {/* Additional recipes (for later) */}
        <SectionCard title="Additional ideas" initiallyOpen>
          <Text style={{ color: theme.subtext, fontSize: 14, marginBottom: 6 }}>
            More ways to use {ingredient.toLowerCase()}:
          </Text>
          <Text style={{ color: theme.subtext, fontSize: 14 }}>
            • Pair it with another scanned ingredient (coming soon).{"\n"}
            • Use it in soups, salads or side dishes.{"\n"}
            • Save ideas you like to your Saved Recipes.
          </Text>
        </SectionCard>
      </ScrollView>
    </View>
  );
}

function RecipeRow({
  title,
  subtitle,
  time,
}: {
  title: string;
  subtitle: string;
  time: string;
}) {
  return (
    <View
      style={{
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: theme.border,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Text
          style={{
            color: theme.text,
            fontWeight: "600",
            fontSize: 15,
            flex: 1,
            marginRight: 8,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: theme.subtext,
            fontSize: 12,
          }}
        >
          {time}
        </Text>
      </View>
      <Text style={{ color: theme.subtext, fontSize: 13 }}>{subtitle}</Text>
    </View>
  );
}
