import React, { useState } from "react";
import * as Yup from "yup";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import { Formik } from "formik";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/user";

export const AuthScreen = (props) => {
  const [newUser, setNewUser] = useState(false);
  const dispatch = useDispatch();

  const authHandler = async (values) => {
    let action;
    if (newUser) {
      action = authActions.signup(
        values.username,
        values.email,
        values.password
      );
    } else {
      action = authActions.login(values.email, values.password);
    }
    try {
      await dispatch(action);
    } catch (err) {
      console.log(err);
    }
  };

  const initialValues = () => {
    if (newUser) {
      return {
        email: "",
        username: "",
        password: "",
      };
    } else {
      return {
        email: "",
        password: "",
      };
    }
  };

  const validationSchema = () => {
    if (newUser) {
      return Yup.object({
        username: Yup.string().required("This Field is Required!"),
        email: Yup.string().email().required("This Field is Required!"),
        password: Yup.string().min(8).required("This Field is Required!"),
      });
    } else {
      return Yup.object({
        email: Yup.string().email().required("This Field is Required!"),
        password: Yup.string().min(8).required("This Field is Required!"),
      });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => authHandler(values)}
      validationSchema={validationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text style={styles.logo}>iSAME</Text>
          {newUser && errors.username && touched.username ? (
            <Text style={styles.errorTxt}>{errors.username}</Text>
          ) : null}
          {newUser && (
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Username..."
                placeholderTextColor="#003f5c"
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
              />
            </View>
          )}
          {errors.email && touched.email ? (
            <Text style={styles.errorTxt}>{errors.email}</Text>
          ) : null}
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Email..."
              placeholderTextColor="#003f5c"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
            />
          </View>
          {errors.password && touched.password ? (
            <Text style={styles.errorTxt}>{errors.password}</Text>
          ) : null}
          <View style={styles.inputView}>
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password..."
              placeholderTextColor="#003f5c"
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
            />
          </View>

          {!newUser && (
            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
            <Text style={styles.loginText}>
              {!newUser ? "LOGIN" : "SIGNUP"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setNewUser(!newUser);
            }}
          >
            <Text style={styles.changeText}>
              {!newUser
                ? "New to iSAME? Signup here!"
                : "ALready have an account?"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  logo: {
    fontFamily: "open-sans-bold",
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    fontFamily: "open-sans",
    height: 50,
    color: "white",
  },
  forgot: {
    fontFamily: "open-sans",
    color: "white",
    fontSize: 14,
  },
  loginBtn: {
    width: "50%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  changeText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 15,
  },
  errorTxt: {
    color: "red",
    width: "70%",
  },
});
