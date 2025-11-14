// app/(tabs)/profile.tsx
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase";
import { theme } from "@/lib/theme";

function isValidEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(email.trim());
}

export default function ProfileScreen() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  // login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // signup state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth
      .getUser()
      .then(({ data }) => {
        if (data.user) {
          setUserEmail(data.user.email ?? null);
          setUserName(
            (data.user.user_metadata as any)?.full_name ??
              data.user.email?.split("@")[0] ??
              null
          );
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleLogin = async () => {
    setLoginError(null);

    if (!isValidEmail(loginEmail)) {
      setLoginError("Please enter a valid email like name@example.com");
      return;
    }
    if (loginPassword.length < 6) {
      setLoginError("Password must be at least 6 characters.");
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail.trim(),
        password: loginPassword,
      });
      if (error) {
        if (error.message.toLowerCase().includes("invalid login")) {
          setLoginError("Email or password is incorrect.");
        } else {
          setLoginError(error.message);
        }
        return;
      }
      // fetch user again
      const { data } = await supabase.auth.getUser();
      setUserEmail(data.user?.email ?? null);
      setUserName(
        (data.user?.user_metadata as any)?.full_name ??
          data.user?.email?.split("@")[0] ??
          null
      );
    } catch (e: any) {
      setLoginError(e?.message ?? String(e));
    }
  };

  const handleSignup = async () => {
    setSignupError(null);

    if (!isValidEmail(signupEmail)) {
      setSignupError("Use a valid email like cook@gmail.com.");
      return;
    }
    if (signupPassword.length < 6) {
      setSignupError("Password should be at least 6 characters.");
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail.trim(),
        password: signupPassword,
        options: {
          data: {
            full_name: signupEmail.trim().split("@")[0],
          },
        },
      });

      if (error) {
        setSignupError(error.message);
        return;
      }

      Alert.alert(
        "Account created",
        "You’re signed in and ready to start scanning!"
      );

      setUserEmail(data.user?.email ?? signupEmail.trim());
      setUserName(
        (data.user?.user_metadata as any)?.full_name ??
          signupEmail.trim().split("@")[0]
      );
    } catch (e: any) {
      setSignupError(e?.message ?? String(e));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserEmail(null);
    setUserName(null);
    setLoginEmail("");
    setLoginPassword("");
    setSignupEmail("");
    setSignupPassword("");
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.bg,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: theme.subtext }}>Loading profile…</Text>
      </View>
    );
  }

  const isLoggedIn = !!userEmail;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.bg }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {isLoggedIn ? (
          <>
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "800",
                  color: theme.text,
                }}
              >
                My Profile
              </Text>

              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: "#FFEBD1",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="settings-outline" size={18} color="#E57C23" />
              </View>
            </View>

            {/* Profile card */}
            <Card
              style={{
                padding: 18,
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
              }}
            >
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: "#FFEFD0",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 24 }}>
                  {userName?.[0]?.toUpperCase() ?? "N"}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: theme.text,
                  }}
                >
                  {userName ?? "NutriSnap cook"}
                </Text>
                <Text style={{ fontSize: 12, color: theme.subtext }}>
                  {userEmail}
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    color: theme.primary,
                    marginTop: 4,
                  }}
                >
                  NutriSnap early access • beta
                </Text>
              </View>
            </Card>

            {/* Options list */}
            <Card
              style={{
                marginTop: 18,
                padding: 12,
                gap: 4,
              }}
            >
              {[
                { icon: "time-outline", label: "Scan history" },
                { icon: "bookmark-outline", label: "Saved recipes" },
                { icon: "notifications-outline", label: "Notifications" },
                { icon: "help-circle-outline", label: "About NutriSnap" },
              ].map((item, idx) => (
                <View
                  key={item.label}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 10,
                    borderBottomWidth:
                      idx === 3 ? 0 : StyleSheet.hairlineWidth,
                    borderBottomColor: theme.border,
                  }}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={18}
                    color={theme.text}
                    style={{ width: 26 }}
                  />
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 14,
                      color: theme.text,
                    }}
                  >
                    {item.label}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={theme.subtext}
                  />
                </View>
              ))}
            </Card>

            <Button
              title="Log out"
              onPress={handleLogout}
              style={{ marginTop: 22 }}
            />
          </>
        ) : (
          <>
            <Text
              style={{
                fontSize: 22,
                fontWeight: "800",
                color: theme.text,
                marginBottom: 4,
              }}
            >
              Welcome to NutriSnap 👋
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: theme.subtext,
                marginBottom: 18,
              }}
            >
              Create a free account to sync your scans and save recipes across
              devices.
            </Text>

            <Card style={{ padding: 18 }}>
              {/* Toggle row */}
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#F6F3FF",
                  borderRadius: 999,
                  padding: 3,
                  marginBottom: 16,
                }}
              >
                <Pressable
                  style={{
                    flex: 1,
                    borderRadius: 999,
                    paddingVertical: 8,
                    alignItems: "center",
                    backgroundColor:
                      authMode === "login" ? "#fff" : "transparent",
                  }}
                  onPress={() => setAuthMode("login")}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color:
                        authMode === "login" ? theme.text : theme.subtext,
                    }}
                  >
                    Login
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    flex: 1,
                    borderRadius: 999,
                    paddingVertical: 8,
                    alignItems: "center",
                    backgroundColor:
                      authMode === "signup" ? "#fff" : "transparent",
                  }}
                  onPress={() => setAuthMode("signup")}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: "600",
                      color:
                        authMode === "signup" ? theme.text : theme.subtext,
                    }}
                  >
                    Sign up
                  </Text>
                </Pressable>
              </View>

              {authMode === "login" ? (
                <>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      color: theme.text,
                      marginBottom: 10,
                    }}
                  >
                    Welcome back
                  </Text>

                  {/* Email */}
                  <Text
                    style={{
                      fontSize: 12,
                      color: theme.subtext,
                      marginBottom: 4,
                    }}
                  >
                    Email
                  </Text>
                  <View
                    style={{
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: theme.border,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      marginBottom: 12,
                      backgroundColor: "#fff",
                    }}
                  >
                    <TextInput
                      value={loginEmail}
                      onChangeText={setLoginEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholder="you@example.com"
                      style={{ fontSize: 14, color: theme.text }}
                    />
                  </View>

                  {/* Password */}
                  <Text
                    style={{
                      fontSize: 12,
                      color: theme.subtext,
                      marginBottom: 4,
                    }}
                  >
                    Password
                  </Text>
                  <View
                    style={{
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: theme.border,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      value={loginPassword}
                      onChangeText={setLoginPassword}
                      secureTextEntry={!showLoginPassword}
                      autoCapitalize="none"
                      placeholder="Enter your password"
                      style={{ flex: 1, fontSize: 14, color: theme.text }}
                    />
                    <Pressable
                      onPress={() =>
                        setShowLoginPassword((v) => !v)
                      }
                    >
                      <Ionicons
                        name={
                          showLoginPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={20}
                        color={theme.subtext}
                      />
                    </Pressable>
                  </View>

                  {loginError && (
                    <Text
                      style={{
                        marginTop: 8,
                        fontSize: 12,
                        color: "#E53935",
                      }}
                    >
                      {loginError}
                    </Text>
                  )}

                  <Button
                    title="Login"
                    onPress={handleLogin}
                    style={{ marginTop: 18 }}
                  />
                </>
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                      color: theme.text,
                      marginBottom: 10,
                    }}
                  >
                    Create your NutriSnap account
                  </Text>

                  {/* Email */}
                  <Text
                    style={{
                      fontSize: 12,
                      color: theme.subtext,
                      marginBottom: 4,
                    }}
                  >
                    Email
                  </Text>
                  <View
                    style={{
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: theme.border,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      marginBottom: 12,
                      backgroundColor: "#fff",
                    }}
                  >
                    <TextInput
                      value={signupEmail}
                      onChangeText={setSignupEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      placeholder="chef@gmail.com"
                      style={{ fontSize: 14, color: theme.text }}
                    />
                  </View>

                  {/* Password */}
                  <Text
                    style={{
                      fontSize: 12,
                      color: theme.subtext,
                      marginBottom: 4,
                    }}
                  >
                    Password
                  </Text>
                  <View
                    style={{
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: theme.border,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      value={signupPassword}
                      onChangeText={setSignupPassword}
                      secureTextEntry={!showSignupPassword}
                      autoCapitalize="none"
                      placeholder="At least 6 characters"
                      style={{ flex: 1, fontSize: 14, color: theme.text }}
                    />
                    <Pressable
                      onPress={() =>
                        setShowSignupPassword((v) => !v)
                      }
                    >
                      <Ionicons
                        name={
                          showSignupPassword
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={20}
                        color={theme.subtext}
                      />
                    </Pressable>
                  </View>

                  {signupError && (
                    <Text
                      style={{
                        marginTop: 8,
                        fontSize: 12,
                        color: "#E53935",
                      }}
                    >
                      {signupError}
                    </Text>
                  )}

                  <Button
                    title="Create account"
                    onPress={handleSignup}
                    style={{ marginTop: 18 }}
                  />
                </>
              )}
            </Card>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
