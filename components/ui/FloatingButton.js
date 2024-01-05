import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/colors";

function FloatingButton({ onPress, name }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.circle} onPress={onPress}>
        <Ionicons name={name} size={30} color={Colors.background} />
      </TouchableOpacity>
    </View>
  );
}

export default FloatingButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row-reverse",
  },
  circle: {
    backgroundColor: Colors.accent,
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 40,
    right: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
