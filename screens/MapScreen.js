import MapView from "react-native-map-clustering";
import { useEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import { fetchChurches } from "../util/fetch";

function MapScreen() {
  const [churches, setChurches] = useState([]);

  useEffect(() => {
    getChurches();
  }, []);

  async function getChurches() {
    try {
      const allChurches = await fetchChurches();

      setChurches(allChurches);
    } catch (error) {
      Alert.alert("Could not fetch churches");
    }
  }

  function Root() {
    if (churches.length === 0) {
      return <LoadingOverlay message="Fetching all churchess..." />;
    } else {
      return (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 51.9189046,
            longitude: 19.1343786,
            latitudeDelta: 9,
            longitudeDelta: 9,
          }}
          preserveClusterPressBehavior={true}
        >
          {churches.map((church, index) => {
            const coords = {
              latitude: parseFloat(church.coordinats[0]),
              longitude: parseFloat(church.coordinats[1]),
            };

            return (
              <Marker
                key={index}
                coordinate={coords}
                title={church.name}
                description={
                  church.street + ", " + church.postalCode + " " + church.city
                }
              />
            );
          })}
        </MapView>
      );
    }
  }

  return Root();
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
