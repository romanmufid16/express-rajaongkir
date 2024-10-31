import cities from '../models/city.js';
import dotenv from 'dotenv';
dotenv.config();

const getCity = async (req, res) => {
  const url = 'https://api.rajaongkir.com/starter/city';
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
    if (cities.length >= 1) {

    }
    cities.push(...data.rajaongkir.results);

    const id = req.query.id;
    const province_id = req.query.province;

    if (id && province_id) {
      return res.status(400).json({ message: 'Please provide either city_id or province_id' });
    }

    if (province_id) {
      const city = cities.filter(c => c.province_id === province_id);
      if (city) {
        return res.status(200).json(city);
      } else {
        return res.status(404).json({ message: 'City not found' });
      }
    }

    if (id) {
      const city = cities.find(c => c.city_id === id);
      if (city) {
        return res.status(200).json(city);
      } else {
        return res.status(404).json({ message: 'City not found' });
      }
    }

    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getCity };