import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import FooterMenu from "../../components/Menus/FooterMenu";

const About = () => {
  const [state] = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <Text>About</Text>
      <Text>{JSON.stringify(state, null, 4)}</Text>
      <FooterMenu />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 10,
    marginTop: 40,
  },
});
export default About;
