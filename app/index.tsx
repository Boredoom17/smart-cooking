// app/index.tsx
import { Redirect } from "expo-router";

export default function Index() {
  // When the app launches, go straight to the tab layout
  return <Redirect href="/(tabs)/" />;
}
