import express from 'express';
import restfulApi from '../modules/restfulApi';

const router = express.Router();

router.all('/items', restfulApi.restful('Items'));

export default router;