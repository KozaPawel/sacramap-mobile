import { View, Text, TextInput, StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  fullBorder,
  placeholder,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          isInvalid && styles.inputInvalid,
          fullBorder && styles.border,
        ]}
        autoCapitalize="none"
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        placeholder={placeholder}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  labelInvalid: {
    color: Colors.error500,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: Colors.accent,
    paddingVertical: 6,
    paddingHorizontal: 6,
    backgroundColor: Colors.background,
    fontSize: 16,
  },
  inputInvalid: {
    backgroundColor: Colors.error100,
    borderColor: Colors.error500,
  },
  border: {
    borderWidth: 1,
    borderRadius: 5,
  },
});
