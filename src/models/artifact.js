const mongoose = require("mongoose");

const artifactSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
      trim: true,
    },
    Present_location: {
      type: String,
      trim: true,
    },
    Inventory_number: {
      type: String,
      trim: true,
    },
    Image: { type: String },
    Category: {
      type: String,
      required: true,
      trim: true,
    },
    Archaeological_Site: {
      type: String,
      required: true,
      trim: true,
    },
    Provenance: {
      type: String,
      required: true,
      trim: true,
    },
    Materials: {
      type: String,
      required: true,
      trim: true,
    },
    Technique: {
      type: String,
      trim: true,
    },
    Preservation: {
      type: String,
      trim: true,
    },
    Colours: {
      type: String,
      trim: true,
    },
    Height: {
      type: Number,
      trim: true,
    },
    Width: {
      type: Number,
      trim: true,
    },
    Length: {
      type: Number,
      trim: true,
    },
    Weight: {
      type: Number,
      trim: true,
    },
    Depth: {
      type: Number,
      trim: true,
    },
    Dating: {
      type: String,
      required: true,
      trim: true,
    },
    Acquisition: {
      type: String,
      trim: true,
    },
    Object_History: {
      type: String,
      required: true,
      trim: true,
    },
    Editor_of_record: {
      type: String,
      required: true,
      trim: true,
    },
    Designation: {
      type: String,
      required: true,
      trim: true,
    },
    Language: {
      type: String,
      required: true,
      trim: true,
    },
    Category_of_text: {
      type: String,
      trim: true,
    },
    Preservation_of_Text: {
      type: String,
      trim: true,
    },
    Transliteration: {
      type: String,
      trim: true,
    },
    Writing: {
      type: String,
      trim: true,
    },
    Gods: {
      type: String,
      trim: true,
    },
    Kings: {
      type: String,
      trim: true,
    },
    Description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const artifact = mongoose.model("artifact", artifactSchema);

artifactSchema.methods.toJSON = function () {
  const artifact = this;
  const artifactObject = artifact.toObject();

  return artifactObject;
};

module.exports = artifact;
