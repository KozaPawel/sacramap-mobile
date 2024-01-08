import { useEffect, useState } from "react";
import { Alert } from "react-native";

import Map from "../components/Map";
import { fetchAllChurches } from "../util/fetch";

function MapScreen() {
  const [churches, setChurches] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    getChurches();
  }, []);

  async function getChurches() {
    setIsFetching(true);

    try {
      const allChurches = await fetchAllChurches();

      setChurches(allChurches);
    } catch (error) {
      Alert.alert(
        "Could not fetch churches",
        "Check your internet connection or try restarting app"
      );
    }

    setIsFetching(false);
  }

  return <Map churches={churches} isFetching={isFetching} />;
}

export default MapScreen;
