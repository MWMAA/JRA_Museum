const express = require("express");
const { auth } = require("../middleware/auth");
const userRoutes = require("../controllers/userController");
const router = new express.Router();

router.post("/SignUp", userRoutes.SignUp);
router.post("/LogIn", userRoutes.LogIn);
router.post("/LogOut", userRoutes.LogOut);
router.post("/tokenRefresh", userRoutes.tokenRefresh);
router.get("/emailVerification", userRoutes.verification);
router.post("/forgotPassword", userRoutes.forgotPassword);
router.patch("/resetPassword/:resetToken", userRoutes.resetPassword);
router.patch("/updatePassword", auth, userRoutes.updatePassword);

router
  .route("/users/me")
  .get(auth, userRoutes.readUser)
  .patch(
    auth,
    userRoutes.uploadUserAvatar,
    userRoutes.resizeUserPhoto,
    userRoutes.updateUser
  )
  .delete(auth, userRoutes.deleteUser);

module.exports = router;
