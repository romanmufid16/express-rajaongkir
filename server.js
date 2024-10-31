import express from 'express';
import cors from 'cors';
import provinceRoutes from './routes/provinceRoute.js';
import cityRoutes from './routes/cityRoute.js';
import costRoutes from './routes/costRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/provinces', provinceRoutes);
app.use('/api/v1/cities', cityRoutes);
app.use('/api/v1/costs', costRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
