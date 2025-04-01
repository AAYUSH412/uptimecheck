import express from 'express';
import { getWebsite, getWebsiteStatus, postWebsite, deleteWebsite } from '../controller/apicontroller.js';
import { authmiddleware } from '../middleware.js';
import { prismaclient } from "db/client"


const router = express.Router();

router.post('/website', authmiddleware, postWebsite);
router.get('/website', authmiddleware, getWebsite);
router.get('/website/status', authmiddleware, getWebsiteStatus);
router.delete('/website', authmiddleware, deleteWebsite);

export default router;