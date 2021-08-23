import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { default as Icons } from "react-native-vector-icons/MaterialCommunityIcons";

const ArtifactCard = (props) => {
  const data = props.data;
  return (
    <View style={styles.container}>
      <View style={styles.postHeader}>
        <TouchableOpacity style={styles.infoWrapper}>
          <Text style={styles.text_bold}>
            {data.Designation ? data.Designation : "Name Unknown"}
          </Text>
        </TouchableOpacity>
        <View style={styles.iconView}>
          <Icons name="map-search" size={24} />
          <Text style={(styles.text, { fontSize: 12 })}>
            {data.Archaeological_Site
              ? data.Archaeological_Site.split(":")[0].trim()
              : "Unknown"}
          </Text>
        </View>
      </View>
      <View>
        <Image
          style={styles.mainImage}
          source={{
            uri: `data:image/jpeg;base64,${data.Image}`,
          }}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.WrapperContainer}>
          <View style={styles.reactions}>
            <View style={styles.iconView}>
              <Icons name="map-marker" size={24} />
              <Text style={styles.text}>
                {data.Present_location
                  ? data.Present_location.split("[")[0].trim()
                  : "Unknown"}
              </Text>
            </View>
          </View>
          <View style={styles.TextRow}>
            <Text style={styles.text}>
              {data.Materials ? data.Materials.split(":")[0].trim() : "Unknown"}
            </Text>
            <Text style={styles.marker}>.</Text>
            <Text style={styles.text}>
              {data.Category ? data.Category.split(":")[0].trim() : "Unknown"}
            </Text>
            <Text>.</Text>
            <Text style={styles.text}>
              {data.Dating ? data.Dating.split(":")[0].trim() : "Unknown"}
            </Text>
          </View>
        </View>
        {props.children && (
          <View style={styles.WrapperContainer}>{props.children}</View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopColor: "#ddd",
    borderTopWidth: 0.5,
    borderBottomColor: "#ddd",
    borderBottomWidth: 0.5,
    backgroundColor: "white",
  },
  infoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  body: {
    overflow: "hidden",
    backgroundColor: "white",
  },
  WrapperContainer: {
    padding: 10,
  },
  reactions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  lReactions: {
    flexDirection: "row",
    width: "15%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainImage: { height: 300, width: "100%" },
  TextRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 5,
  },
  iconView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text_bold: { fontFamily: "open-sans-bold", fontSize: 14 },
  text: { fontFamily: "open-sans", fontSize: 14, textTransform: "capitalize" },
  btnViewCmt: {
    marginVertical: 5,
  },
  marker: {
    fontWeight: "bold",
  },
});

export default ArtifactCard;
