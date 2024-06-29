import express from "express"
import { deleteUser, updateUser, getUserListings, getUser } from "../controllers/user.controller.js";
import verifyToken from "../utils/verifyUser.js";


const router = express.Router()     
 
// important point :- 
// when you get information from database then apply - get method
//but when you give information in database then apply - put or post method
  

router.post('/update/:id',verifyToken, updateUser)
router.delete('/delete/:id',verifyToken, deleteUser)
router.get('/listings/:id',verifyToken, getUserListings)
router.get('/:id', verifyToken, getUser)

 
export default router;         
 