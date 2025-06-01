import { SafeAreaView as AndroidAreaView } from "react-native-safe-area-context";
import { Platform, SafeAreaView as IOSAreaView } from "react-native";
import { ScrollView, View } from "react-native";
import { ReactDOM } from "react";

import { useEffect, ReactNode } from "react";

export default function SafeAreaView({ children }: { children: ReactNode }) {
	if (Platform.OS === "android") {
		return (
			<AndroidAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
				{children}
			</AndroidAreaView>
		);
	}
	if (Platform.OS === "ios") {
		return (
			<IOSAreaView style={{ flex: 1, backgroundColor: "#1c2834" }}>
				<ScrollView contentContainerStyle={{ flex: 1, height: "100%", width: "100%" }}>
					{children}
				</ScrollView>
			</IOSAreaView>
		);
	}
}
