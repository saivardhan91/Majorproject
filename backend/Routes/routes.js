const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
const FormController =require('../controllers/SubmitForm');
const SettingsController=require('../controllers/Settings');
const ProfileDetailsController=require('../controllers/ProfileDetailsEdit')
const ConversationController = require('../controllers/conversation'); 
const MessageController=require('../controllers/message');
const userController=require('../controllers/userController')
const MatchesController=require('../controllers/MatchesController');
const ShortListController=require('../controllers/shortlistController');

const multer=require('multer');
const storage = multer.memoryStorage(); // Store image in memory as a Buffer
const upload = multer({ storage: storage });


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
router.post("/Mbti-Result",FormController.mbtiResult);
router.post("/Forgot-password",LoginController.ForgotPassword);
router.put("/Update-password",LoginController.Changepassword);

//messages
router.get('/user/:id', userController.getUserById);
router.post('/conversation',ConversationController.conversation);
router.get('/conversation/:userId',ConversationController.conversationGet);
router.post('/conversation/messages', upload.single('image'), MessageController.Message);
router.get('/conversation/messages/:conversationId',MessageController.MessageGet);
router.delete('/conversation/:conversationId/:userId', ConversationController.deleteConversation);
router.get('/conversation',ConversationController.ConversationDetails);
router.put('/conversation', ConversationController.updateConversation);
router.delete('/DeleteMessage/:id',MessageController.DeleteMessage);
router.put('/UpdateConversationDate/:conversationId',ConversationController.updateConversationDate);
router.put('/reaction/:messageId',MessageController.Reaction);
router.put('/reply/:messageId',MessageController.Reply);
router.get('/Search',userController.getAllUsers);

router.get('/matches/:userId',MatchesController.getMatches);
router.post("/shortlist",ShortListController.shortlist);
router.delete("/shortlist/:userId/:profileId",ShortListController.deleteShortList);
router.get("/shortlist/:userId",ShortListController.getShortListUser);
module.exports = router;
