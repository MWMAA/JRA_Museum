import React from "react";
import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";

const HomeScreen = (props) => {
  return (
    <SafeAreaView style={styles.screen}>
      <TouchableOpacity
        style={styles.Btn}
        onPress={() => {
          props.navigation.navigate("Artifacts");
        }}
      >
        <Text style={styles.text}>Informative Section</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Btn} onPress={() => {}}>
        <Text style={styles.text}>Video Game</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  Btn: {
    width: "50%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
});

export default HomeScreen;
