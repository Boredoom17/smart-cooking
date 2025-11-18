// app/(tabs)/index.tsx
import { View, Text, Image, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { theme } from "@/lib/theme";

const heroImage =
  "https://images.pexels.com/photos/6287527/pexels-photo-6287527.jpeg?auto=compress&cs=tinysrgb&w=800";

const quickMeals = [
  {
    title: "Cozy potato bowl",
    subtitle: "Perfect for today’s potato demo.",
    image:
      "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "Uses potato",
  },
  {
    title: "Fresh veggie salad",
    subtitle: "Soon powered by multi-ingredient scan.",
    image:
      "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=800",
    tag: "Coming soon",
  },
];

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
      {/* Top header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "800",
              color: theme.text,
            }}
          >
            NutriSnap
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: theme.subtext,
              marginTop: 2,
            }}
          >
            Smart cooking, one scan at a time.
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
            backgroundColor: theme.card,
            borderWidth: 1,
            borderColor: theme.border,
          }}
        >
          <Text style={{ fontSize: 11, color: theme.subtext }}>
            Beta • Potato demo
          </Text>
        </View>
      </View>

      {/* Hero */}
      <Card
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <View style={{ flex: 1, marginRight: 12 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "600",
              color: theme.primaryDark,
              marginBottom: 4,
            }}
          >
            Scan • Detect • Cook
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: theme.text,
              marginBottom: 6,
            }}
          >
            What will you cook today?
          </Text>
          <Text
            style={{ fontSize: 13, color: theme.subtext, marginBottom: 14 }}
          >
            Right now NutriSnap have only little framework done. After this demo, we’ll
            expand to multiple ingredients and full recipe flows.
          </Text>
          <Button title="Start scanning" onPress={goToScan} />
        </View>

        <Image
          source={{ uri: heroImage }}
          style={{
            width: 110,
            height: 110,
            borderRadius: 18,
          }}
        />
      </Card>

      {/* Mini stats */}
      <View
        style={{
          flexDirection: "row",
          marginBottom: 18,
        }}
      >
        <Card
          style={{
            flex: 1,
            marginRight: 8,
            paddingVertical: 14,
          }}
        >
          <Text
            style={{ fontSize: 11, color: theme.subtext, marginBottom: 4 }}
          >
            Demo ingredient
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "700", color: theme.text }}>
            Potato 🥔
          </Text>
        </Card>

        <Card
          style={{
            flex: 1,
            marginLeft: 8,
            paddingVertical: 14,
          }}
        >
          <Text
            style={{ fontSize: 11, color: theme.subtext, marginBottom: 4 }}
          >
            Next step
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "700", color: theme.text }}>
            Multi-ingredient
          </Text>
        </Card>
      </View>

      {/* From your fridge (demo) */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: theme.text,
          marginBottom: 8,
        }}
      >
        From your fridge (demo)
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        {quickMeals.map((item) => (
          <Card
            key={item.title}
            style={{
              width: 220,
              marginRight: 12,
              paddingBottom: 12,
            }}
          >
            <Image
              source={{ uri: item.image }}
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
                marginBottom: 4,
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: theme.subtext,
                marginBottom: 6,
              }}
            >
              {item.subtitle}
            </Text>
            <Text
              style={{
                fontSize: 11,
                color: theme.primaryDark,
              }}
            >
              {item.tag}
            </Text>
          </Card>
        ))}
      </ScrollView>

      {/* How NutriSnap helps */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: theme.text,
          marginBottom: 10,
        }}
      >
        How NutriSnap will help you
      </Text>

      <Card>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 18, marginRight: 10 }}>📸</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700", color: theme.text }}>
              Scan what you have
            </Text>
            <Text style={{ fontSize: 12, color: theme.subtext }}>
              Point your camera at ingredients. For today, we&apos;re demoing
              potato detection end–to–end.
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 18, marginRight: 10 }}>🍲</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700", color: theme.text }}>
              Get smart recipe ideas
            </Text>
            <Text style={{ fontSize: 12, color: theme.subtext }}>
              Soon you&apos;ll see full recipes based on everything NutriSnap
              detects from your kitchen.
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 18, marginRight: 10 }}>📊</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700", color: theme.text }}>
              See nutrition at a glance
            </Text>
            <Text style={{ fontSize: 12, color: theme.subtext }}>
              We&apos;ll surface calories and macros per serving so you don&apos;t
              have to open another app.
            </Text>
          </View>
        </View>
      </Card>
    </ScrollView>
  );
}
