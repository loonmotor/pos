import express from 'express';
import restfulApi from '../modules/restfulApi';

const router = express.Router();

router.all('/transaction/:id?', restfulApi.restful('NoScript.Transaction'));

export default router;