const mongoose = require('mongoose');
const Schema_1 = require('./server')

mongoose.connect("mongodb://127.0.0.1:27017/Scrapp", {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
})

const DataSchema = new mongoose.Schema({
  num: { type: Number },
  Present_location: { type: String, trim: true },
  International_Inventory_number: { type: String, trim: true },
  Inventory_number: { type: String, trim: true },
  Designation: { type: String, trim: true },
  Category: { type: String, trim: true },
  Typology: { type: String, trim: true },
  Description: { type: String, trim: true },
  Archaeological_Site: { type: String, trim: true },
  Provenance: { type: String, trim: true },
  Materials: { type: String, trim: true },
  Technique: { type: String, trim: true },
  Preservation: { type: String, trim: true },
  Colours: { type: String, trim: true },
  Height: { type: String, trim: true },
  Width: { type: String, trim: true },
  Length: { type: String, trim: true },
  Depth: { type: String, trim: true },
  Diameter: { type: String, trim: true },
  Weight: { type: String, trim: true },
  Dating: { type: String, trim: true },
  Gods: { type: String, trim: true },
  Kings: { type: String, trim: true },
  Persons: { type: String, trim: true },
  Writing: { type: String, trim: true },
  Language: { type: String, trim: true },
  Category_of_text: { type: String, trim: true },
  Preservation_of_Text: { type: String, trim: true },
  Hieroglyphs: { type: String, trim: true },
  Transliteration: { type: String, trim: true },
  Translation: { type: String, trim: true },
  Acquisition: { type: String, trim: true },
  Year_of_Acquisition: { type: String, trim: true },
  Object_History: { type: String, trim: true },
  Associated_Objects: { type: String, trim: true },
  Photographic_references: { type: String, trim: true },
  Editor_of_record: { type: String, trim: true },
  First_Registration_Date: { type: String, trim: true },
  Last_Update: { type: String, trim: true },
  Bibliography: { type: String, trim: true },
  General_Comment: { type: String, trim: true },
},
  { strict: false }
);

const Schema = mongoose.model('DataSchema', DataSchema)

const reFormatter = async () => {
  const data = await Schema_1.find({});
  // console.log(data)

  try {
    for (const ele in data) {
      console.log(ele)
      const element = Object.values(data[ele])[5]
      const dataa = new Schema({
        num: element["num"],
        Present_location: element["Present location"],
        International_Inventory_number: element["International Inventory number"],
        Inventory_number: element["Inventory number"],
        Designation: element["Designation"],
        Category: element["Category"],
        Typology: element["Typology"],
        Description: element["Description"],
        Archaeological_Site: element["Archaeological Site"],
        Provenance: element["Provenance"],
        Materials: element["Materials"],
        Technique: element["Technique"],
        Preservation: element["Preservation"],
        Colours: element["Colours"],
        Height: parseFloat(element["Height "]),
        Width: parseFloat(element["Width "]),
        Length: parseFloat(element["Length "]),
        Depth: parseFloat(element["Depth "]),
        Diameter: parseFloat(element["Diameter  "]),
        Weight: parseFloat(element["Weight  "]),
        Dating: element["Dating"],
        Gods: element["Gods"],
        Kings: element["Kings"],
        Persons: element["Persons"],
        Writing: element["Writing"],
        Language: element["Language"],
        Category_of_text: element["Category of text"],
        Preservation_of_Text: element["Preservation of Text"],
        Hieroglyphs: element["Hieroglyphs"],
        Transliteration: element["Transliteration"],
        Translation: element["Translation"],
        Acquisition: element["Acquisition"],
        Year_of_Acquisition: element["Year of Acquisition"],
        Object_History: element["Object's History"],
        Associated_Objects: element["Associated Objects"],
        Photographic_references: element["Photographic references"],
        Editor_of_record: element["Editor of record"],
        First_Registration_Date: element["First Registration Date"],
        Last_Update: element["Last Update"],
        Bibliography: element["Bibliography"],
        General_Comment: element["General Comment"],
      })
      await dataa.save()
      console.log('saved')
    }
  } catch (e) {
    console.log(e)
  }
}

reFormatter()