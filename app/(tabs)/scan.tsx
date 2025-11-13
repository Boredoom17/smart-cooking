// app/(tabs)/scan.tsx
import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { theme } from "@/lib/theme";
import { uploadImageFromUri } from "@/lib/storage";
import { inferAndInsert } from "@/services/detections";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export default function ScanScreen() {
  const camRef = useRef<CameraView>(null);
  const [perm, requestPerm] = useCameraPermissions();
  const [uri, setUri] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);
  const [lastResult, setLastResult] = useState<{
    label: string;
    confidence: number;
  } | null>(null);

  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserLoggedIn(!!data.user);
    });
  }, []);

  const openCamera = async () => {
    if (!perm || !perm.granted) {
      const { granted } = await requestPerm();
      if (!granted) return;
    }
  };

  const take = async () => {
    try {
      const pic = await camRef.current?.takePictureAsync();
      if (pic?.uri) {
        setUri(pic.uri);
        setLastResult(null);
      }
    } catch (e: any) {
      Alert.alert("Camera error", e?.message ?? String(e));
    }
  };

  const analyze = async () => {
    if (!uri) return;
    try {
      setBusy(true);
      const { data } = await supabase.auth.getUser();
      const userId = data.user?.id;
      const { publicUrl } = await uploadImageFromUri(
        uri,
        userId ?? "anon",
        "uploads"
      );
      const row = await inferAndInsert(publicUrl, userId ?? null);
      setLastResult({ label: row.label, confidence: row.confidence });
    } catch (e: any) {
      Alert.alert("Analysis failed", e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  };

  if (userLoggedIn === false) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.bg,
          padding: 16,
          justifyContent: "center",
        }}
      >
        <Card style={{ padding: 20, alignItems: "center" }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: theme.text,
              marginBottom: 8,
            }}
          >
            Sign in to start scanning
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: theme.subtext,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Create a free NutriSnap account to keep your scan history and
            recipes synced.
          </Text>
          <Button
            title="Go to profile"
            onPress={() => {
              // simple navigation by changing tab
              // tabs index: 0 home, 1 scan, 2 profile
              // expo-router will handle with this path:
              // @ts-ignore
              window.location.href = "/(tabs)/profile";
            }}
          />
        </Card>
      </View>
    );
  }

  if (userLoggedIn === null) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.bg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
    >
      {/* Tip banner */}
      <Card
        style={{
          padding: 14,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#FFF7E5",
        }}
      >
        <Text style={{ fontSize: 22 }}>💡</Text>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "700",
              color: theme.text,
              marginBottom: 2,
            }}
          >
            Tip for better scans
          </Text>
          <Text style={{ fontSize: 12, color: theme.subtext }}>
            Use natural light, keep one main ingredient centered, and avoid
            strong shadows.
          </Text>
        </View>
      </Card>

      {/* Camera */}
      <View style={{ marginTop: 18 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "700",
            color: theme.text,
            marginBottom: 10,
          }}
        >
          Capture your ingredients
        </Text>

        <View
          style={{
            borderRadius: 24,
            overflow: "hidden",
            backgroundColor: "#000",
            height: Platform.OS === "web" ? 360 : 420,
          }}
        >
          {perm?.granted ? (
            <CameraView ref={camRef} style={{ flex: 1 }} facing="back" />
          ) : (
            <View
              style={{
                flex: 1,
                backgroundColor: "#111",
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "700",
                  marginBottom: 10,
                }}
              >
                Camera permission needed
              </Text>
              <Text
                style={{
                  color: "#f0f0f0",
                  fontSize: 13,
                  textAlign: "center",
                  marginBottom: 18,
                }}
              >
                We only use your camera to scan ingredients. No photos are
                shared without your consent.
              </Text>
              <Button title="Enable camera" onPress={openCamera} />
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 12,
            marginTop: 16,
          }}
        >
          <Button
            title="Capture"
            onPress={take}
            style={{ flex: 1 }}
            disabled={!perm?.granted}
          />
          <Button
            title={busy ? "Analyzing…" : "Analyze"}
            onPress={analyze}
            style={{ flex: 1 }}
            disabled={!uri || busy}
          />
        </View>
      </View>

      {/* Result card */}
      {uri && (
        <Card
          style={{
            marginTop: 18,
            padding: 14,
            backgroundColor: "#fff",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "700",
              color: theme.text,
              marginBottom: 10,
            }}
          >
            Last capture
          </Text>
          <Image
            source={{ uri }}
            style={{
              width: "100%",
              height: 180,
              borderRadius: 16,
              marginBottom: 10,
            }}
          />
          {lastResult ? (
            <View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: theme.text,
                }}
              >
                {lastResult.label}
              </Text>
              <Text style={{ fontSize: 12, color: theme.subtext, marginTop: 2 }}>
                Confidence: {(lastResult.confidence * 100).toFixed(0)}%
              </Text>

              <Button
                title="View recipes for this ingredient"
                onPress={() => {
                  // later: navigate to recipes screen with param
                  Alert.alert(
                    "Recipes coming soon",
                    "For mid-defense, this will show sample recipes based on the detected ingredient."
                  );
                }}
                style={{ marginTop: 14 }}
              />
            </View>
          ) : (
            <Text style={{ fontSize: 12, color: theme.subtext }}>
              Capture a photo and tap Analyze to see ingredient details here.
            </Text>
          )}
        </Card>
      )}
    </ScrollView>
  );
}
