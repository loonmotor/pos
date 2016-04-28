import express from 'express';
import restfulApi from '../modules/restfulApi';

const router = express.Router();

router.all('/item/:id?', restfulApi.restful('NoScript.Item'));

export default router;