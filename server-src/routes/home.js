import express from 'express';
import restfulApi from '../modules/restfulApi';

const router = express.Router();

router.all('/home', restfulApi.restful('Home'));

export default router;