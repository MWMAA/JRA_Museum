import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import ArtifactCard from "../../components/ArtifactCard/ArtifactCard";
import * as artifactActions from "../../store/actions/artifacts";
import { useDispatch, useSelector } from "react-redux";

const ArtifactListScreen = (props) => {
  const Artifacts = useSelector((state) => state.artifacts.artifacts);
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(0);

  const selectItemHandler = (_id, name) => {
    props.navigation.navigate("Artifact Detail", {
      artifactId: _id,
      artifactName: name,
    });
  };

  useEffect(() => {
    const getArtifacts = () => {
      dispatch(artifactActions.fetchArtifacts(skip));
      setSkip(skip + 5);
    };
    getArtifacts();
  }, [dispatch]);

  const fetchData = () => {
    dispatch(artifactActions.fetchArtifacts(skip));
    setSkip(skip + 5);
  };

  return (
    <FlatList
      data={Artifacts}
      keyExtractor={(item) => item.International_Inventory_number}
      onEndReached={fetchData}
      renderItem={(itemData) => (
        <TouchableOpacity
          onPress={() => {
            selectItemHandler(itemData.item._id, itemData.item.Designation);
          }}
        >
          <ArtifactCard data={itemData.item} />
        </TouchableOpacity>
      )}
    />
  );
};

export default ArtifactListScreen;
