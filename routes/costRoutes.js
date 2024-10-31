import { checkCost, getCosts } from '../controllers/costController.js';
import express from 'express';

const routes = express.Router();

routes.post('/', checkCost);
routes.get('/', getCosts);

export default routes;