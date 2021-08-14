import React from "react";
import { Text, View, StyleSheet } from "react-native";
import ArtifactCard from "../../components/ArtifactCard/ArtifactCard";

const data = [
  {
    id: "1",
    Present_location: "PELIZAEUS-MUSEUM",
    Designation: "Seated figure of Sa-Hathor",
    Category: "RECEPTACLE",
    Description:
      "This statue of Sa-Hathor set on a flat base shows him seated cross-legged.The arms and hands are placed flat on the thighs in the posture of prayer.The official is wearing a wig which falls onto his shoulders and a long kiltwhich completely covers his legs.",
    Archaeological_Site: "UPPER EGYPT",
    Materials: "NON ORGANIC",
    Technique: "GENERAL TECHNIQUE:Â Â SCULPTURED",
    Dating: "OLD KINGDOM",
    Language: "EGYPTIAN",
    imageUrl:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHlyYW1pZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
  },
];

const ArtifactDetailScreen = (props) => {
  const { artifactId } = props.route.params;
  const dataa = data.find((item) => item.id === artifactId);

  return (
    <ArtifactCard data={dataa}>
      <Text style={styles.text}>{dataa.Description}</Text>
    </ArtifactCard>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
    fontSize: 14,
    textAlign: "justify",
  },
});

export default ArtifactDetailScreen;
