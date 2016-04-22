import express from 'express';
import restfulApi from '../modules/restfulApi';

const router = express.Router();

router.all('/items/:offset?/:limit?', restfulApi.restful('Items'));

export default router;