// import { Router } from "express";
// import { login, register, uploadProfilePicture } from "../controller/user.controller.js";
// import multer from "multer";

// const router = Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {

//         cb(null, "uploads/");

//     },

//     filename: (req, file, cb) => {
//         cb(null, file.originalname);

//     },

// })

// const uploads = multer({ storage: storage });

// router

//     .route("/update_profile_picture")
//     .post(uploads.single("profile_picture"), uploadProfilePicture);

// router.route('/register').post(register);
// router.route("/login").post(login);

// export default router;

import { Router } from "express";

import {
  login,
  register,
  uploadProfilePicture,
  updateUserProfile,
  getUserProfile,
  updateProfileData,
  getAllUserProfile,
  downloadProfile,
  sendConnectionRequest,
  getMyConnectionRequests,
  whatAreMyConnections,
  acceptConnectionRequest,
} from "../controllers/user.controller.js";

import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploads = multer({ storage: storage });

router
  .route("/update_profile_picture")
  .post(
    uploads.single("profile_picture"),
    uploadProfilePicture,
    getAllUserProfile
  );

router
    .route("/user/download_resume")
    .post(downloadProfile);

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user_update").post(updateUserProfile);
router.route("/get_user_and_profile").post(getUserProfile);
router.route("/update_profile_data").post(updateProfileData);
router.route("/get_all_users").get(getAllUserProfile);
router.route("/user/download_resume").get(downloadProfile);
router.route("/user/send_connection_request").post(sendConnectionRequest);
router.route("/user/get_connection_requests").get(getMyConnectionRequests);
router.route("/user/user_connection_request").get(whatAreMyConnections);
router.route("/user/accept_connection_request").post(acceptConnectionRequest);

export default router;
