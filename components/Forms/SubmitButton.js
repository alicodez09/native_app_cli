import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

const SubmitButton = ({ title, handleSubmit, loading }) => {
  return (
    <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
      <Text style={styles.heading}>{loading ? "Loading.." : title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  submitBtn: {
    backgroundColor: "whitesmoke",
    height: 50,
    marginHorizontal: 100,
    borderRadius: 10,
    justifyContent: "center",
    marginBottom: 15,
  },
  heading: {
    textAlign: "center",
    color: "#000",
    fontSize: 19,
  },
});
export default SubmitButton;
