const express = require("express");
const { auth, restrictTo } = require("../middleware/auth");
const router = new express.Router();
const artifactController = require("../controllers/artifactController");

router
  .route("/artifacts")
  .post(auth, artifactController.createArtifact)
  .get(auth, artifactController.readArtifacts);

router
  .route("/artifacts/:id")
  .get(auth, artifactController.readArtifact)
  .patch(auth, restrictTo("editor", "admin"), artifactController.UpdateArtifact)
  .delete(
    auth,
    restrictTo("editor", "admin"),
    artifactController.DeleteArtifact
  );

module.exports = router;
