import express from 'express';
import restfulApi from '../modules/restfulApi';

const router = express.Router();

router.all('/transactions', restfulApi.restful('NoScript.Transactions'));

export default router;