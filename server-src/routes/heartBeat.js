import express from 'express';
import restfulApi from '../modules/restfulApi';

const router = express.Router();

router.get('/', restfulApi.restful('HeartBeat'));

export default router;