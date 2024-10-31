import express from 'express';
import { getCity } from '../controllers/cityController.js';

const routes = express.Router();

routes.get('/', getCity);

export default routes;