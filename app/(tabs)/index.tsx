// app/(tabs)/index.tsx
import { View, Text, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { theme } from "@/lib/theme";

const heroImage =
  "https://images.pexels.com/photos/6287527/pexels-photo-6287527.jpeg?auto=compress&cs=tinysrgb&w=800";
const quickRecipe =
  "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800";
const saladImage =
  "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=800";
const bowlImage =
  "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800";

export default function HomeScreen() {
  const router = useRouter();

  const goToScan = () => {
    router.push("/(tabs)/scan");
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <Card
        style={{
          flexDirection: "row",
          padding: 18,
          alignItems: "center",
          gap: 14,
          backgroundColor: "#fff",
        }}
      >
        <View style={{ flex: 1, paddingRight: 4 }}>
          <Text
            style={{
              fontSize: 12,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: theme.subtext,
              marginBottom: 4,
            }}
          >
            NutriSnap
          </Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: theme.text,
              marginBottom: 8,
            }}
          >
            What will you cook today?
          </Text>
          <Text
            style={{ fontSize: 13, color: theme.subtext, marginBottom: 14 }}
          >
            Scan your ingredients and let NutriSnap build recipes around what
            you already have.
          </Text>

          <Button title="Start scanning" onPress={goToScan} />
        </View>

        <Image
          source={{ uri: heroImage }}
          style={{
            width: 82,
            height: 82,
            borderRadius: 24,
            resizeMode: "cover",
          }}
        />
      </Card>

      {/* Today’s ideas */}
      <Text
        style={{
          marginTop: 22,
          marginBottom: 8,
          fontSize: 16,
          fontWeight: "700",
          color: theme.text,
        }}
      >
        Quick ideas from your fridge
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 4, gap: 12 }}
      >
        <Card
          style={{
            width: 210,
            padding: 10,
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <Image
            source={{ uri: quickRecipe }}
            style={{
              width: "100%",
              height: 110,
              borderRadius: 16,
              marginBottom: 8,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: theme.text,
            }}
          >
            15-min veggie stir fry
          </Text>
          <Text style={{ fontSize: 12, color: theme.subtext, marginTop: 2 }}>
            Perfect when you have leftover veggies and one pan.
          </Text>
        </Card>

        <Card
          style={{
            width: 210,
            padding: 10,
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <Image
            source={{ uri: saladImage }}
            style={{
              width: "100%",
              height: 110,
              borderRadius: 16,
              marginBottom: 8,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: theme.text,
            }}
          >
            Crunchy bowl upgrade
          </Text>
          <Text style={{ fontSize: 12, color: theme.subtext, marginTop: 2 }}>
            NutriSnap can turn a simple salad into a full meal.
          </Text>
        </Card>

        <Card
          style={{
            width: 210,
            padding: 10,
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <Image
            source={{ uri: bowlImage }}
            style={{
              width: "100%",
              height: 110,
              borderRadius: 16,
              marginBottom: 8,
            }}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: theme.text,
            }}
          >
            One-bowl comfort
          </Text>
          <Text style={{ fontSize: 12, color: theme.subtext, marginTop: 2 }}>
            Scan potatoes, eggs, veggies – get cozy bowl recipes in seconds.
          </Text>
        </Card>
      </ScrollView>

      {/* How it works */}
      <Text
        style={{
          marginTop: 22,
          marginBottom: 8,
          fontSize: 16,
          fontWeight: "700",
          color: theme.text,
        }}
      >
        How NutriSnap helps you cook
      </Text>

      <Card
        style={{
          padding: 14,
          backgroundColor: "#fff",
          gap: 10,
        }}
      >
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: "#FFEFD0",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18 }}>📸</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700", color: theme.text }}>
              Scan ingredients
            </Text>
            <Text style={{ fontSize: 12, color: theme.subtext }}>
              NutriSnap detects what’s on your cutting board using your camera.
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: "#EAF7FF",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18 }}>🍲</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700", color: theme.text }}>
              Get smart recipes
            </Text>
            <Text style={{ fontSize: 12, color: theme.subtext }}>
              We match your ingredients to recipes that fit your time and mood.
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: "#E9F9E5",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 18 }}>📊</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700", color: theme.text }}>
              See nutrition at a glance
            </Text>
            <Text style={{ fontSize: 12, color: theme.subtext }}>
              Later we’ll show calories and macros per serving for each dish.
            </Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}
