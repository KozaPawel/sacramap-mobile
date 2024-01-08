import { useContext, useState, useEffect } from "react";
import { Alert } from "react-native";

import LoadingOverlay from "../components/ui/LoadingOverlay";
import UserMap from "../components/UserMap";
import { AuthContext } from "../store/auth-context";
import { fetchUserVisitations } from "../util/fetch";
import { refreshToken } from "../util/refreshToken";
import { uniqueArray } from "../util/uniqueArray";

function VisitedPlacesScreen() {
  const [visitations, setVisitations] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    getVisitations();
  }, []);

  async function getVisitations() {
    setIsFetching(true);

    try {
      const response = await fetchUserVisitations(authCtx.token);

      setVisitations(uniqueArray(response));
    } catch (error) {
      if (error.response?.status === 401) {
        const newTokens = await refreshToken(authCtx.refreshToken);
        authCtx.authenticate(newTokens.accessToken, newTokens.refreshToken);

        const response = await fetchUserVisitations(newTokens.accessToken);

        setVisitations(uniqueArray(response));
      } else {
        Alert.alert("Could not fetch visited places");
      }
    }

    setIsFetching(false);
  }

  if (isFetching) {
    return <LoadingOverlay message="Fetching visited places..." />;
  } else {
    return <UserMap churches={visitations} />;
  }
}

export default VisitedPlacesScreen;
