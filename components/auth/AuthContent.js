import { useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("Signup");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes("@");
    const passwordIsValid =
      password.length > 6 && /\d/.test(password) && /\w/.test(password);
    const passwordsAreEqual = password === confirmPassword;

    if (!emailIsValid || !passwordIsValid || (!isLogin && !passwordsAreEqual)) {
      if (!passwordIsValid && !isLogin) {
        Alert.alert(
          "Invalid password",
          "Password needs to be at least 6 characters long, have at least 1 non alphanumeric character e.g. (! or $) and 1 digit ('0'-'9')."
        );

        return;
      }
      Alert.alert("Invalid input", "Please check your entered credentials.");
      setCredentialsInvalid({
        email: !emailIsValid,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password });
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.authContent}>
        <Image
          style={{ width: 200, height: 100, alignSelf: "center" }}
          source={require("../../assets/adaptive-icon.png")}
        />
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.buttons}>
          <FlatButton onPress={switchAuthModeHandler}>
            {isLogin
              ? "Don't have an account yet? Sign up"
              : "Have an account already? Log in"}
          </FlatButton>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
  },
  buttons: {
    marginTop: 8,
  },
});
