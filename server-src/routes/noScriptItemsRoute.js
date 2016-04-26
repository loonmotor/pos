import express from 'express';
import restfulApi from '../modules/restfulApi';

const router = express.Router();

router.all('/items', restfulApi.restful('NoScript.Items'));

export default router;