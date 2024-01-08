import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import ChurchesList from "../components/ChurchesList";
import { fetchCityChurches } from "../util/fetch";
import { Colors } from "../constants/colors";

function SearchScreen() {
  const [searchValue, setSearchValue] = useState("");
  const [fetchedChurches, setFetchedChurches] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  async function getSearchedChurches() {
    if (searchValue.length > 2) {
      try {
        setIsSearching(true);
        setFetchedChurches([]);

        const churches = await fetchCityChurches(searchValue);

        setFetchedChurches(churches);
      } catch (error) {
        Alert.alert("Could not find churches in this city");
        setFetchedChurches([]);
      }
    } else {
      Alert.alert("To search for a city", "Type at least 3 letters");
    }

    setIsSearching(false);
  }

  return (
    <View style={styles.container}>
      <View>
        <Input
          placeholder={"City name"}
          onUpdateValue={(text) => setSearchValue(text)}
          fullBorder={true}
        />

        <View style={styles.button}>
          <Button
            onPress={() => {
              getSearchedChurches();
            }}
          >
            {isSearching ? (
              <ActivityIndicator color={Colors.background} size="small" />
            ) : (
              "Search"
            )}
          </Button>
        </View>
      </View>

      <ChurchesList data={fetchedChurches} />
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    padding: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 10,
  },
});
