import provinces from '../models/province.js';
import dotenv from 'dotenv';
dotenv.config();

const getProvince = async (req, res) => {
  const url = 'https://api.rajaongkir.com/starter/province';
  const token = process.env.API_KEY;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      key: token
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (provinces.length === 0) {
      provinces.push(...data.rajaongkir.results);
    }

    const id = req.query.id;
    if (id) { 
      const province = provinces.find(p => p.province_id === id);
      if (province) {
        return res.status(200).json(province);
      } else {
        return res.status(404).json({ error: 'Province not found' });
      }
    }

    res.status(200).json(provinces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getProvince };