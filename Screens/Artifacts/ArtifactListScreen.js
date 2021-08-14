import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import ArtifactCard from "../../components/ArtifactCard/ArtifactCard";
import ArtifactForm from "../../components/ArtifactForm";

const data = [
  {
    id: "1",
    Present_location: "PELIZAEUS-MUSEUM",
    Designation: "Seated figure of Sa-Hathor",
    Category: "RECEPTACLE",
    Description:
      "This statue of Sa-Hathor set on a\
      flat base shows him seated cross-legged.\
      The arms and hands are placed flat on the thighs in the posture of prayer.\
      The official is wearing a wig which falls onto his shoulders and a long kilt\
      which completely covers his legs.",
    Archaeological_Site: "UPPER EGYPT",
    Materials: "NON ORGANIC",
    Technique: "GENERAL TECHNIQUE:Â Â SCULPTURED",
    Dating: "OLD KINGDOM",
    Language: "EGYPTIAN",
    imageUrl:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHlyYW1pZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
  },
  {
    id: "2",
    Present_location: "PELIZAEUS-MUSEUM",
    Designation: "Seated figure of Sa-Hathor",
    Category: "RECEPTACLE",
    Description:
      "This statue of Sa-Hathor set on a\
      flat base shows him seated cross-legged.\
      The arms and hands are placed flat on the thighs in the posture of prayer.\
      The official is wearing a wig which falls onto his shoulders and a long kilt\
      which completely covers his legs.",
    Archaeological_Site: "UPPER EGYPT",
    Materials: "NON ORGANIC",
    Technique: "GENERAL TECHNIQUE:Â Â SCULPTURED",
    Dating: "OLD KINGDOM",
    Language: "EGYPTIAN",
    imageUrl:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHlyYW1pZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
  },
  {
    id: "3",
    Present_location: "PELIZAEUS-MUSEUM",
    Designation: "Seated figure of Sa-Hathor",
    Category: "RECEPTACLE",
    Description:
      "This statue of Sa-Hathor set on a\
      flat base shows him seated cross-legged.\
      The arms and hands are placed flat on the thighs in the posture of prayer.\
      The official is wearing a wig which falls onto his shoulders and a long kilt\
      which completely covers his legs.",
    Archaeological_Site: "UPPER EGYPT",
    Materials: "NON ORGANIC",
    Technique: "GENERAL TECHNIQUE:Â Â SCULPTURED",
    Dating: "OLD KINGDOM",
    Language: "EGYPTIAN",
    imageUrl:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHlyYW1pZHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
  },
];

const ArtifactListScreen = (props) => {
  const selectItemHandler = (id, name) => {
    props.navigation.navigate("Artifact Detail", {
      artifactId: id,
      artifactName: name,
    });
  };

  return (
    <FlatList
      data={data}
      renderItem={(itemData) => (
        <TouchableOpacity
          onPress={() => {
            selectItemHandler(itemData.item.id, itemData.item.Designation);
          }}
        >
          <ArtifactCard data={itemData.item} />
        </TouchableOpacity>
      )}
    />
  );
};

export default ArtifactListScreen;
