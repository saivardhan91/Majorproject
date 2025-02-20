const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
const FormController =require('../controllers/SubmitForm');
const SettingsController=require('../controllers/Settings');
const ProfileDetailsController=require('../controllers/ProfileDetailsEdit')
router.post("/register", LoginController.Register);
router.post("/Login",LoginController.Login);
router.post("/submit-form",FormController.normalDetails);
router.post("/update-professional",FormController.professionalDetails);
router.post("/FamilyDetails",FormController.familyDetails);
router.post("/ProfileImage",FormController.ProfileImage);
router.get('/get-form/:userId',FormController.getForm);
router.post('/change-password',SettingsController.changePassword);
router.delete('/delete-account',SettingsController.deleteAccount);
router.put('/update-bio/:userId',ProfileDetailsController.PersonalBio);
router.put('/update-baiscdetails/:userId',ProfileDetailsController.BasicDetails);
module.exports = router;
