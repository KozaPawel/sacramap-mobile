import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

function MapScreen() {
  const coord = [51.9189046, 19.1343786];
  const coords = {
    latitude: coord[0],
    longitude: coord[1],
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 51.9189046,
        longitude: 19.1343786,
        latitudeDelta: 9,
        longitudeDelta: 9,
      }}
    >
      <Marker key={1} coordinate={coords} title="test"></Marker>
    </MapView>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
