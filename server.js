const request = require('request')
const cheerio = require('cheerio')
const mongoose = require('mongoose');
const sharp = require('sharp');
const { default: axios } = require('axios');

const schemaSchema = new mongoose.Schema({}, { strict: false });

const Schema = mongoose.model('schemaSchema', schemaSchema)

module.exports = Schema

mongoose.connect("mongodb://127.0.0.1:27017/Scrapp", {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true
})

// 0 -> 150 (150-200)  300 -> 675 // Images + imgs

// let z = 700

// for (let i = (z * 10); i <= ((z + 1) * 10); i++) {
//   let url = `http://www.globalegyptianmuseum.org/record.aspx?id=${i}`

//   request(url, async function (err, res, html) {
//     if (!err) {
//       const $ = cheerio.load(html)

//       const data = new Schema({
//         "num": i,
//         "Present location": $("#location_dummy").val(),
//         "International Inventory number": $("#iin_dummy").val(),
//         "Inventory number": $("#inventory").val(),
//         "Designation": $("#designation_lan").val(),
//         "Category": $("#thesfield_category").children('input').val(),
//         "Typology": $("#typology").val(),
//         "Description": $("#description_lan").val(),
//         "Archaeological Site": $("#thesfield_site").children('input').val(),
//         "Provenance": $("#thesfield_provenance").children('input').val(),
//         "Materials": $("#thesfield_material").children('input').val(),
//         "Technique": $("#thesfield_technique").children('input').val(),
//         "Preservation": $("#thesfield_preservation").children('input').val(),
//         "Colours": $("#colour").val(),
//         "Height ": $("#height").val(),
//         "Width ": $("#width").val(),
//         "Length ": $("#length").val(),
//         "Depth ": $("#depth").val(),
//         "Diameter  ": $("#diameter").val(),
//         "Weight  ": $("#weight").val(),
//         "Dating": $("#thesfield_dating").children('input').val(),
//         "Gods": $("#thesfield_god").children('input').val(),
//         "Kings": $("#thesfield_king").children('input').val(),
//         "Persons": $("#person_html").val(),
//         "Writing": $("#thesfield_writing").children('input').val(),
//         "Language": $("#thesfield_textlanguage").children('input').val(),
//         "Category of text": $("#thesfield_textcategory").children('input').val(),
//         "Preservation of Text": $("#thesfield_textpreservation").children('input').val(),
//         "Hieroglyphs": $("#hierocode").val(),
//         "Transliteration": $("#transliteration").val(),
//         "Translation": $("#translation_lan").children('input').val(),
//         "Acquisition": $("#thesfield_acquisition").children('input').val(),
//         "Year of Acquisition": $("#acquisitionyear").val(),
//         "Object's History": $("#history").val(),
//         "Associated Objects": $("#associated").val(),
//         "Photographic references": $("#photoreference").val(),
//         "Editor of record": $("#editor").val(),
//         "First Registration Date": $("#firstdate").val(),
//         "Last Update": $("#lastupdate").val(),
//         "Bibliography": $("#bibliography").val(),
//         "General Comment": $("#comment").val(),
//       })

//       await data.save()
//       // console.log(i)

//       console.log("Done Aquired Waiting for image.....")
//       const links = []

//       $("img").each((index, image) => {
//         const img = $(image).attr("src").toString()
//         // console.log(img)
//         const baseUrl = "http://www.globalegyptianmuseum.org/"
//         const Link = baseUrl + img;
//         linky = Link.replace("/_100", '')
//         links.push(linky)
//         // console.log(linky)
//       });
//       // console.log(links[links.length - 1])

//       const input = (await axios({ url: links[links.length - 1], responseType: "arraybuffer" })).data;
//       // console.log(input)
//       await sharp(input)
//         .jpeg()
//         .toFile('public/imgs/' + `${$("#inventory").val()}.jpeg`)
//         .then()
//         .catch(e => console.log(e));

//       console.log("Image Aquizired!")
//     }

//   })
// }

// // console.log("Done")