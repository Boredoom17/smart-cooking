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
import { useRouter } from "expo-router";

import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { theme } from "@/lib/theme";
import { uploadImageFromUri } from "@/lib/storage";
import { inferAndInsert } from "@/services/detections";
import { supabase } from "@/lib/supabase";

type ScanResult = {
  label: string;
  confidence: number;
};

export default function ScanScreen() {
  const camRef = useRef<CameraView>(null);
  const [perm, requestPerm] = useCameraPermissions();

  // ✅ Force back camera
  const [facing] = useState<"back" | "front">("back");

  const [uri, setUri] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean | null>(null);
  const [lastResult, setLastResult] = useState<ScanResult | null>(null);

  const router = useRouter();

  // Check auth once
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserLoggedIn(!!data.user);
    });
  }, []);

  const ensureCameraPermission = async () => {
    if (!perm || !perm.granted) {
      const { granted } = await requestPerm();
      if (!granted) return false;
    }
    return true;
  };

  const take = async () => {
    try {
      const ok = await ensureCameraPermission();
      if (!ok) return;

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

    setBusy(true);
    try {
      // 1) Get user (optional)
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const userId = user?.id ?? null;

      // 2) Upload image to Supabase Storage
      const { publicUrl } = await uploadImageFromUri(
        uri,
        userId ?? "anon",
        "uploads"
      );

      // 3) Call Supabase Edge Function "infer" and insert into detections table
      const row = await inferAndInsert(publicUrl, userId);

      // 4) Store result in state for UI
      setLastResult({ label: row.label, confidence: row.confidence });
    } catch (e: any) {
      Alert.alert("Analysis failed", e?.message ?? String(e));
    } finally {
      setBusy(false);
    }
  };

  // Not logged in → show clean card
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
            Create a free NutriSnap account to save your scans and unlock
            personalized recipe suggestions.
          </Text>

          <Button
            title="Go to profile to log in"
            onPress={() => router.push("/(tabs)/profile")}
          />
        </Card>
      </View>
    );
  }

  // Still checking auth
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

  // Main UI
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.bg }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
    >
      {/* Header */}
      <View style={{ marginBottom: 12 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "800",
            color: theme.text,
            marginBottom: 4,
          }}
        >
          Scan ingredients
        </Text>
        <Text style={{ fontSize: 12, color: theme.subtext }}>
          Capture what’s on your cutting board and let NutriSnap analyze it.
        </Text>
      </View>

      {/* Tip banner */}
      <Card
        style={{
          padding: 14,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 22, marginRight: 10 }}>💡</Text>
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

      {/* Camera area */}
      <View style={{ marginTop: 18 }}>
        <View
          style={{
            borderRadius: 24,
            overflow: "hidden",
            backgroundColor: "#000",
            height: Platform.OS === "web" ? 360 : 420,
          }}
        >
          {uri ? (
            // After capture: show still image
            <Image
              source={{ uri }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          ) : perm?.granted ? (
            // Before capture: live camera (BACK camera)
            <CameraView ref={camRef} style={{ flex: 1 }} facing={facing} />
          ) : (
            // Permission fallback
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
              <Button title="Enable camera" onPress={ensureCameraPermission} />
            </View>
          )}
        </View>

        {/* Capture / Analyze buttons */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 16,
          }}
        >
          <View style={{ flex: 1, marginRight: 8 }}>
            <Button
              title="Capture"
              onPress={take}
              disabled={!perm?.granted}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Button
              title={busy ? "Analyzing…" : "Analyze"}
              onPress={analyze}
              disabled={!uri || busy}
            />
          </View>
        </View>

        {/* Retake button */}
        {uri && (
          <Button
            title="Retake"
            onPress={() => {
              setUri(null);
              setLastResult(null);
            }}
            style={{ marginTop: 10 }}
          />
        )}
      </View>

      {/* Result card – shows preview + details after Analyze */}
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
            <>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "700",
                  color: theme.text,
                  marginBottom: 2,
                }}
              >
                {lastResult.label}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: theme.subtext,
                  marginBottom: 10,
                }}
              >
                Confidence: {(lastResult.confidence * 100).toFixed(0)}%
              </Text>
              <Button
                title="View recipes for this ingredient"
                onPress={() => {
                  router.push({
                    pathname: "/recipes",
                    params: { label: lastResult.label },
                  });
                }}
              />
            </>
          ) : (
            <Text style={{ fontSize: 12, color: theme.subtext }}>
              Capture a photo and tap{" "}
              <Text style={{ fontWeight: "700" }}>Analyze</Text> to see
              ingredient details and recipes here.
            </Text>
          )}
        </Card>
      )}
    </ScrollView>
  );
}
