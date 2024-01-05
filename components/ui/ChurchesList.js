import {
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function ChurchesList({ data }) {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              DeviceEventEmitter.emit("event.churchClicked", {
                item,
              });
              navigation.goBack();
            }}
          >
            <ScrollView style={styles.container}>
              <Text style={styles.churchName}>{item.name}</Text>
              <Text style={styles.churchInfo}>{"Ulica " + item.street}</Text>
              <Text style={styles.churchInfo}>
                {item.city + " " + item.postalCode}
              </Text>
            </ScrollView>
          </TouchableOpacity>
        );
      }}
    />
  );
}

export default ChurchesList;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.7,
    borderBottomColor: "#4b5563",
    marginBottom: 4,
  },
  churchName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  churchInfo: {
    fontSize: 14,
    color: "#4b5563",
  },
});
