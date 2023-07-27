import express from 'express';
import {
  createUserIdentity,
  updateUserIdentity,
  deleteUserIdentity,
  getUserIdentity,
  getAllUserIdentities
} from '../controller/userIdentity-controller.js';
  
import { uploadImage, getImage } from '../controller/image-controller.js';
import { newComment, getComments, deleteComment } from '../controller/comment-controller.js';
import { loginUser, singupUser, logoutUser } from '../controller/user-controller.js';
import { authenticateToken, createNewToken } from '../controller/jwt-controller.js';

import upload from '../utils/upload.js';

const router = express.Router();



router.post('/createUser', authenticateToken, createUserIdentity);
router.put('/updateUser/:id', authenticateToken, updateUserIdentity);
router.delete('/deleteUser/:id', authenticateToken, deleteUserIdentity);
router.get('/userIdentity/:id', authenticateToken, getUserIdentity);
router.get('/users', authenticateToken, getAllUserIdentities);

router.post('/login', loginUser);
router.post('/signup', singupUser);
router.post('/logout', logoutUser);

router.post('/token', createNewToken);


router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);

router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default router;