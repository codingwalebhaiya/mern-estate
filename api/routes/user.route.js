import express from "express"
import { test, updateUser } from "../controllers/user.controller.js";
import verifyUser from "../utils/verifyUser.js";


const router = express.Router() 

// important point :- 
// when you get information from database then apply - get method
//but when you give information in database then apply - put or post method

router.get('/test', test)
router.post('/update/:id',verifyUser, updateUser)

export default router;
 