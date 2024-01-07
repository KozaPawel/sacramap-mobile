import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

function LoadingOverlay({ message }) {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" color={Colors.accent} />
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: Colors.background,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});
