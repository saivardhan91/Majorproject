const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
const FormController =require('../controllers/SubmitForm');

router.post("/register", LoginController.Register);
router.post("/Login",LoginController.Login);
router.post("/submit-form",FormController.normalDetails);
router.post("/update-professional",FormController.professionalDetails);
router.post("/FamilyDetails",FormController.familyDetails);
router.post("/ProfileImage",FormController.ProfileImage);
router.get('/get-form/:userId',FormController.getForm);
module.exports = router;
