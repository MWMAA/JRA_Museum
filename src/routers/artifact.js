const express = require('express')
const { auth, restrictTo } = require('../middleware/auth')
const router = new express.Router()
const artifactRoutes = require('../routes/artifactRoutes')

router
  .route('/artifacts')
  .post(auth, artifactRoutes.createArtifact)
  .get(auth, artifactRoutes.readArtifacts)

router
  .route('/artifacts/:id')
  .get(auth, artifactRoutes.readArtifact)
  .patch(auth, restrictTo('editor', "admin"), artifactRoutes.UpdateArtifact)
  .delete(auth, restrictTo('editor', "admin"), artifactRoutes.DeleteArtifact)

module.exports = router