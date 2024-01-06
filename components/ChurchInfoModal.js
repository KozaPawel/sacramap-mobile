import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import { useContext, useState } from "react";

import Button from "./ui/Button";
import { addVisitedChurch } from "../../util/post";
import { AuthContext } from "../../store/auth-context";
import { Colors } from "../../constants/colors";

function ChurchInfoModal({ data, isVisible, closeModal }) {
  const { width, height } = useWindowDimensions();
  const [isSending, setIsSending] = useState(false);

  const authCtx = useContext(AuthContext);

  async function addChurch(churchId) {
    setIsSending(true);

    try {
      await addVisitedChurch(churchId, authCtx.token);
      closeModal();
    } catch (error) {
      console.log(error);
    }

    setIsSending(false);
  }

  return (
    <Modal
      animationType={"slide"}
      transparent={true}
      visible={isVisible}
      onBackdropPress={closeModal}
    >
      <View style={styles.outerContainer}>
        <View
          style={[
            styles.innerContainer,
            { width: width * 0.8, maxHeight: height * 0.2 },
          ]}
        >
          <Text style={styles.churchName}>{data.name}</Text>
          <Text style={styles.churchInfo}>
            {data.street + ", " + data.postalCode + " " + data.city}
          </Text>
          <Button isDisabled={isSending} onPress={() => addChurch(data.id)}>
            {isSending ? (
              <ActivityIndicator color={Colors.background} size="small" />
            ) : (
              "Mark as visited"
            )}
          </Button>
        </View>
      </View>
    </Modal>
  );
}

export default ChurchInfoModal;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    float: 1,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 4,
  },
  churchName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  churchInfo: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 5,
  },
});
