import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Link = "http://192.168.1.103:3000";

export const fetchArtifacts = (skip) => {
  console.log(skip);
  return async (dispatch) => {
    const accessToken = await AsyncStorage.getItem("Access_Token");
    axios
      .get(`${Link}/artifacts?skip=${skip}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(async (res) => {
        dispatch({
          type: "SET_ARTIFACTS",
          artifacts: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

// export const createArtifacts = () => {
//   return async (dispatch) => {
//     const accessToken = await AsyncStorage.getItem("accessToken");
//     axios
//       .get(
//         "http://192.168.1.103:3000/",
//         {
//           //DATA GOES HERE
//         },
//         {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then(async (res) => {
//         dispatch({
//           type: "SET_ARTIFACTS",
//           products: res.data,
//         });
//       })
//       .catch((err) => console.log(err));
//   };
// };
