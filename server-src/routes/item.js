import express from 'express';
import restfulApi from '../modules/restfulApi';

const router = express.Router();

router.all('/item/:id?', restfulApi.restful('Item'));

export default router;