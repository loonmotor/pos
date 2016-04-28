import express from 'express';
import restfulApi from '../modules/restfulApi';

const router = express.Router();

router.all('/transactions/:offset?/:limit?', restfulApi.restful('Transactions'));

export default router;