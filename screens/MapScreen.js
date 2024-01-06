import { useEffect, useState } from "react";
import { Alert } from "react-native";

import Map from "../components/Map";
import { fetchAllChurches } from "../util/fetch";

function MapScreen() {
  const [churches, setChurches] = useState([]);

  useEffect(() => {
    getChurches();
  }, []);

  async function getChurches() {
    try {
      const allChurches = await fetchAllChurches();

      setChurches(allChurches);
    } catch (error) {
      Alert.alert("Could not fetch churches");
    }
  }

  return <Map churches={churches} />;
}

export default MapScreen;
