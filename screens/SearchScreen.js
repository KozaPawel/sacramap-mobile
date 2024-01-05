import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import ChurchesList from "../components/ui/ChurchesList";
import { fetchCityChurches } from "../util/fetch";

function SearchScreen() {
  const [searchValue, setSearchValue] = useState("");
  const [fetchedChurches, setFetchedChurches] = useState([]);

  async function getSearchedChurches() {
    if (searchValue.length > 2) {
      try {
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
            {"Search"}
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
