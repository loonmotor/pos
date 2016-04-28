import express from 'express';
import restfulApi from '../modules/restfulApi';

const router = express.Router();

router.all('/transaction/:id?', restfulApi.restful('Transaction'));

export default router;