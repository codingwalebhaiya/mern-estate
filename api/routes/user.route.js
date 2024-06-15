import express from "express"
import { test } from "../controllers/user.controller.js";


const router = express.Router() 

// important point :- 
// when you get information from database then apply - get method
//but when you give information in database then apply - put or post method

router.get('/test', test)

export default router;
