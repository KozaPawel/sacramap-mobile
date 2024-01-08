import MapView from "react-native-map-clustering";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, DeviceEventEmitter } from "react-native";
import { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import FloatingButton from "./ui/FloatingButton";
import ChurchInfoModal from "./ChurchInfoModal";

function Map({ churches, isFetching }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    DeviceEventEmitter.addListener("event.churchClicked", (eventData) =>
      goToLocation(eventData.item)
    );
  }, []);

  const mapRef = useRef(null);

  const navigation = useNavigation();

  function goToLocation(church) {
    try {
      mapRef.current.animateToRegion({
        latitude: parseFloat(church.coordinats[0]),
        longitude: parseFloat(church.coordinats[1]),
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      });
    } catch (error) {}
  }

  function showModal(data) {
    setModalVisible(true);
    setModalData(data);
  }

  if (churches.length === 0 && isFetching) {
    return <LoadingOverlay message="Fetching all churches..." />;
  } else {
    return (
      <>
        <ChurchInfoModal
          data={modalData}
          isVisible={modalVisible}
          closeModal={() => setModalVisible(false)}
        />

        <MapView
          ref={mapRef}
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
                tracksViewChanges={false}
                onPress={() => showModal(church)}
              />
            );
          })}
        </MapView>

        <FloatingButton
          onPress={() => navigation.navigate("Search")}
          name="search-outline"
        />
      </>
    );
  }
}

export default Map;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
