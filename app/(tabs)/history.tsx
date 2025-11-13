import { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import Card from "@/components/ui/Card";
import { theme } from "@/lib/theme";
import { listDetections } from "@/services/detections";
import { Detection } from "@/lib/types";


export default function HistoryScreen() {
const [items, setItems] = useState<Detection[]>([]);
useEffect(() => { (async () => setItems(await listDetections(25)))(); }, []);
return (
<View style={{ flex: 1, backgroundColor: theme.bg, padding: 16 }}>
<FlatList
data={items}
keyExtractor={(x) => x.id}
ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
renderItem={({ item }) => (
<Card>
<View style={{ flexDirection: "row", gap: 12 }}>
<Image source={{ uri: item.image_url }} style={{ width: 76, height: 76, borderRadius: 12 }} />
<View style={{ flex: 1 }}>
<Text style={{ color: theme.text, fontWeight: "700", fontSize: 16 }}>{item.label}</Text>
<Text style={{ color: theme.subtext, marginTop: 4 }}>Confidence: {(item.confidence * 100).toFixed(0)}%</Text>
<Text style={{ color: theme.subtext, marginTop: 2 }}>{new Date(item.created_at).toLocaleString()}</Text>
</View>
</View>
</Card>
)}
/>
</View>
);
}