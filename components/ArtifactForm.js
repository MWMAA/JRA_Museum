import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input, NativeBaseProvider, FormControl } from "native-base";

const ArtifactForm = (props) => {
  const initialValues = {
    Present_location: "",
    Designation: "",
    Category: "",
    Description: "",
    Archaeological_Site: "",
    Provenance: "",
    Materials: "",
    Technique: "",
    Preservation: "",
    Colours: "",
    Height: "",
    Width: "",
    Length: "",
    Depth: "",
    Diameter: "",
    Weight: "",
    Dating: "",
    Gods: "",
    Kings: "",
    Writing: "",
    Language: "",
    Category_of_text: "",
    Preservation_of_Text: "",
    Hieroglyphs: "",
    Transliteration: "",
    Acquisition: "",
    Object_History: "",
    Editor_of_record: "",
    First_Registration_Date: "",
  };

  const validationSchema = Yup.object({
    Present_location: Yup.string(),
    Designation: Yup.string(),
    Category: Yup.string(),
    Description: Yup.string(),
    Archaeological_Site: Yup.string(),
    Provenance: Yup.string(),
    Materials: Yup.string(),
    Technique: Yup.string(),
    Preservation: Yup.string(),
    Colours: Yup.string(),
    Height: Yup.number(),
    Width: Yup.number(),
    Length: Yup.number(),
    Depth: Yup.number(),
    Diameter: Yup.number(),
    Weight: Yup.number(),
    Dating: Yup.string(),
    Gods: Yup.string(),
    Kings: Yup.string(),
    Writing: Yup.string(),
    Language: Yup.string(),
    Category_of_text: Yup.string(),
    Preservation_of_Text: Yup.string(),
    Hieroglyphs: Yup.string(),
    Transliteration: Yup.string(),
    Acquisition: Yup.string(),
    Object_History: Yup.string(),
    Editor_of_record: Yup.string(),
    First_Registration_Date: Yup.date(),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
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
        <ScrollView>
          <NativeBaseProvider>
            <Input
              styles={styles.InputText}
              label="Present_location"
              placeholder="Present_location..."
              value={values.Present_location}
              onChangeText={handleChange("Present_location")}
              onBlur={handleBlur("Present_location")}
            />

            <FormControl>
              <FormControl.Label>Form Controlled Input</FormControl.Label>
              <Input
                placeholder="Designation..."
                value={values.Designation}
                onChangeText={handleChange("Designation")}
                onBlur={handleBlur("Designation")}
              />
            </FormControl>

            <Input
              placeholder="Category..."
              value={values.Category}
              onChangeText={handleChange("Category")}
              onBlur={handleBlur("Category")}
            />
            <Input
              placeholder="Description..."
              value={values.Description}
              onChangeText={handleChange("Description")}
              onBlur={handleBlur("Description")}
            />
            <Input
              placeholder="Archaeological_Site..."
              value={values.Archaeological_Site}
              onChangeText={handleChange("Archaeological_Site")}
              onBlur={handleBlur("Archaeological_Site")}
            />
            <Input
              placeholder="Provenance..."
              value={values.Provenance}
              onChangeText={handleChange("Provenance")}
              onBlur={handleBlur("Provenance")}
            />
            <Input
              placeholder="Provenance..."
              value={values.Provenance}
              onChangeText={handleChange("Provenance")}
              onBlur={handleBlur("Provenance")}
            />
            <Input
              placeholder="Materials..."
              value={values.Materials}
              onChangeText={handleChange("Materials")}
              onBlur={handleBlur("Materials")}
            />
            <Input
              placeholder="Technique..."
              value={values.Technique}
              onChangeText={handleChange("Technique")}
              onBlur={handleBlur("Technique")}
            />
            <Input
              placeholder="Preservation..."
              value={values.Preservation}
              onChangeText={handleChange("Preservation")}
              onBlur={handleBlur("Preservation")}
            />
            <Input
              placeholder="Colours..."
              value={values.Colours}
              onChangeText={handleChange("Colours")}
              onBlur={handleBlur("Colours")}
            />
          </NativeBaseProvider>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  InputText: {
    color: "white",
  },
});

export default ArtifactForm;
