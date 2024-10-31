import costs from '../models/cost.js';
import request from 'request';

const checkCost = async (req, res) => {
  const url = 'https://api.rajaongkir.com/starter/cost';
  const token = process.env.API_KEY;
  const options = {
    method: 'POST',
    url: url,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      key: token
    },
    form: {
      origin: req.body.origin,
      destination: req.body.destination,
      weight: req.body.weight,
      courier: req.body.courier,
    }
  };

  request(options, async (error, response, body) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (response.statusCode === 200) {
      const data = JSON.parse(body);
      costs.push(...data.rajaongkir.results);
      return res.status(200).json({ message: 'Cost data saved successfully', data: costs });
    } else {
      return res.status(response.statusCode).json({ error: body });
    }
  });
};

const getCosts = async (req, res) => {
  if (costs.length === 0) {
    return res.status(404).json({ message: 'There\'s no costs data'});
  }
  res.status(200).json(costs);
};

export { checkCost, getCosts };