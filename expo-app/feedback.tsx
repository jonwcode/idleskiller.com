import { StyleSheet, View, Text, Button } from "react-native";
import * as Haptics from "expo-haptics";

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Haptics.selectionAsync</Text>
			<View style={styles.buttonContainer}>
				<Button
					title="Selection"
					onPress={() => /* @info */ Haptics.selectionAsync() /* @end */}
				/>
			</View>
			<Text style={styles.text}>Haptics.notificationAsync</Text>
			<View style={styles.buttonContainer}>
				<Button
					title="Success"
					onPress={
						() =>
							/* @info */ Haptics.notificationAsync(
								Haptics.NotificationFeedbackType.Success
							) /* @end */
					}
				/>
				<Button
					title="Error"
					onPress={
						() =>
							/* @info */ Haptics.notificationAsync(
								Haptics.NotificationFeedbackType.Error
							) /* @end */
					}
				/>
				<Button
					title="Warning"
					onPress={
						() =>
							/* @info */ Haptics.notificationAsync(
								Haptics.NotificationFeedbackType.Warning
							) /* @end */
					}
				/>
			</View>
			<Text style={styles.text}>Haptics.impactAsync</Text>
			<View style={styles.buttonContainer}>
				<Button
					title="Light"
					onPress={
						() =>
							/* @info */ Haptics.impactAsync(
								Haptics.ImpactFeedbackStyle.Light
							) /* @end */
					}
				/>
				<Button
					title="Medium"
					onPress={
						() =>
							/* @info */ Haptics.impactAsync(
								Haptics.ImpactFeedbackStyle.Medium
							) /* @end */
					}
				/>
				<Button
					title="Heavy"
					onPress={
						() =>
							/* @info */ Haptics.impactAsync(
								Haptics.ImpactFeedbackStyle.Heavy
							) /* @end */
					}
				/>
				<Button
					title="Rigid"
					onPress={
						() =>
							/* @info */ Haptics.impactAsync(
								Haptics.ImpactFeedbackStyle.Rigid
							) /* @end */
					}
				/>
				<Button
					title="Soft"
					onPress={
						() =>
							/* @info */ Haptics.impactAsync(
								Haptics.ImpactFeedbackStyle.Soft
							) /* @end */
					}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		paddingHorizontal: 16,
	},
	buttonContainer: {
		flexDirection: "row",
		alignItems: "stretch",
		marginTop: 10,
		marginBottom: 30,
		justifyContent: "space-between",
	},
});
