import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import ArtifactCard from "../../components/ArtifactCard/ArtifactCard";

const ArtifactDetailScreen = (props) => {
  const Artifacts = useSelector((state) => state.artifacts.artifacts);
  const { artifactId } = props.route.params;
  const artifact = Artifacts.find((item) => item._id === artifactId);

  return (
    <View styles={{ flex: 1, backgroundColor: "white" }}>
      <ArtifactCard data={artifact}>
        <Text style={styles.text}>{artifact.Object_History}</Text>
      </ArtifactCard>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
    fontSize: 14,
    // textAlign: "justify",
  },
});

export default ArtifactDetailScreen;
