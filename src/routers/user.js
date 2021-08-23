const express = require("express");
const { auth } = require("../middleware/auth");
const userController = require("../controllers/userController");
const router = new express.Router();

router.post("/SignUp", userController.SignUp);
router.post("/LogIn", userController.LogIn);
router.post("/LogOut", userController.LogOut);
router.post("/tokenRefresh", userController.tokenRefresh);
router.get("/emailVerification", userController.verification);
router.post("/forgotPassword", userController.forgotPassword);
router.patch("/resetPassword/:resetToken", userController.resetPassword);
router.patch("/updatePassword", auth, userController.updatePassword);

router
  .route("/users/me")
  .get(auth, userController.readUser)
  .patch(
    auth,
    userController.uploadUserAvatar,
    userController.resizeUserPhoto,
    userController.updateUser
  )
  .delete(auth, userController.deleteUser);

module.exports = router;
