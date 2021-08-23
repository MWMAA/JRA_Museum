const Artifact = require("../models/artifact");
const catchAsync = require("../utils/catchAsync");
const fs = require("fs");

// Create Artifact
exports.createArtifact = catchAsync(async (req, res, next) => {
  const artifact = new Artifact({
    ...req.body,
    editor: req.user,
  });

  await artifact.save();
  res.status(201).send(artifact);
});

// Read Artifact
// GET/ artifacts?limit=3&skip=3
// GET/ artifacts?sortBy=createdAt:asc
exports.readArtifacts = catchAsync(async (req, res, next) => {
  const artifacts = await Artifact.find({})
    .skip(parseInt(req.query.skip) + 1)
    .limit(5);

  for (let i = 0; i < artifacts.length; i++) {
    let bitmap = fs.readFileSync(
      `./public/imgs/${artifacts[i].Inventory_number}.jpeg`
    );
    artifacts[i].Image = new Buffer.from(bitmap).toString("base64");
  }

  res.send(artifacts);
});

// Read Artifact
exports.readArtifact = catchAsync(async (req, res, next) => {
  const _id = req.params.id;
  const artifact = await Artifact.findOne({ _id });

  if (!artifact) {
    return res.status(404).send(artifact);
  }
  res.send(artifact);
});

// Update Artifact
exports.UpdateArtifact = catchAsync(async (req, res, next) => {
  const update = Object.keys(req.body);
  const allowedUpdats = ["name", "history", "era", "origin", "age"];
  const isValidOperation = update.every((update) =>
    allowedUpdats.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  const artifact = await Artifact.findOne({ _id: req.params.id });

  if (!artifact) {
    return res.status(404).send();
  }

  update.forEach((updates) => (artifact[updates] = req.body[updates]));
  await artifact.save();
  res.send(artifact);
});

// Delete Artifact
exports.DeleteArtifact = catchAsync(async (req, res, next) => {
  const artifact = await Artifact.findOneAndDelete({ _id: req.params.id });

  if (!artifact) {
    res.status(404).send();
  }

  res.send();
});
