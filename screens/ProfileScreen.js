import { useContext, useState, useCallback } from "react";
import { Text, View, Alert, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Button from "../components/ui/Button";
import ChurchesList from "../components/ChurchesList";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { Colors } from "../constants/colors";
import { fetchUserVisitations } from "../util/fetch";
import { refreshToken } from "../util/refreshToken";
import { uniqueArray } from "../util/uniqueArray";

function ProfileScreen() {
  const [visitations, setVisitations] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const authCtx = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      getVisitations(10);
    }, [])
  );

  async function getVisitations(howMany) {
    setIsFetching(true);

    try {
      const response = await fetchUserVisitations(authCtx.token);

      howMany === undefined
        ? setVisitations(uniqueArray(response))
        : setVisitations(uniqueArray(response).slice(0, howMany));
    } catch (error) {
      if (error.response?.status === 401) {
        const newTokens = await refreshToken(authCtx.refreshToken);
        authCtx.authenticate(newTokens.accessToken, newTokens.refreshToken);

        const response = await fetchUserVisitations(newTokens.accessToken);

        howMany === undefined
          ? setVisitations(uniqueArray(response))
          : setVisitations(uniqueArray(response).slice(0, howMany));
      } else {
        Alert.alert("Could not fetch user data");
      }
    }

    setIsFetching(false);
  }

  if (isFetching) {
    return <LoadingOverlay message="Fetching user data..." />;
  } else {
    return (
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.text}>
            {visitations.length === 10
              ? "Last 10 visitations"
              : `All visitations (${visitations.length})`}
          </Text>
          {visitations.length === 0 ? (
            ""
          ) : (
            <View style={styles.buttonContainer}>
              <Button onPress={() => getVisitations(10)}>
                {"10 visitations"}
              </Button>
              <Button onPress={() => getVisitations()}>
                {"All visitations"}
              </Button>
            </View>
          )}
          <ChurchesList data={visitations} />
        </View>
      </View>
    );
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 10,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 10,
    marginHorizontal: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
  },
});
