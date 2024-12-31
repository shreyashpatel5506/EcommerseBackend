const express = require('express');
import {registercontroller} from '../controller/authcontroller'

const router = express.Router();

//Route 1:--Register
router.post('/register',registercontroller)

export default router;