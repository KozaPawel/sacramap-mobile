import MapView from "react-native-map-clustering";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Marker } from "react-native-maps";

import ChurchInfoModal from "./ChurchInfoModal";

function UserMap({ churches }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);

  function showModal(data) {
    setModalVisible(true);
    setModalData(data);
  }

  return (
    <>
      <ChurchInfoModal
        data={modalData}
        isVisible={modalVisible}
        closeModal={() => setModalVisible(false)}
        userMap={true}
      />

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
              tracksViewChanges={false}
              onPress={() => showModal(church)}
            />
          );
        })}
      </MapView>
    </>
  );
}

export default UserMap;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
