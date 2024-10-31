import express from 'express';
import { getProvince } from '../controllers/provinceController.js';

const routes = express.Router();

routes.get('/', getProvince);

export default routes;