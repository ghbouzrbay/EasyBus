import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class BusesController {
  static async getBuses(request, response) {
    const token = request.headers['x-token'];
    const userid = await redisClient.get(`auth_${token}`);
    if (!userid) {
      return response.status(401).send({ error: 'Unauthorized' });
    }
    const buses = await dbClient.buses.find().toArray();
    return response.status(200).send(buses);
  }

  static async getBusId(request, response) {
    const token = request.headers['x-token'];
    const userid = await redisClient.get(`auth_${token}`);
    if (!userid) {
      return response.status(401).send({ error: 'Unauthorized' });
    }
    const busId = request.params.id || '';
    const bus = await dbClient.buses.findOne({ busId }) || {};
    return response.status(200).send(bus);
  }
}

module.exports = BusesController;
