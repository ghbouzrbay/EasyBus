import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class BusesController {
  static async getBuses(request, response) {
    const buses = await dbClient.buses.find().toArray();
    return response.status(200).send(buses);
  }

  static async getBusId(request, response) {
    const busId = request.params.id || '';
    const bus = await dbClient.buses.findOne({ busId }) || {};
    return response.status(200).send(bus);
  }

  static async getStation(request, response) {
    const stationName = request.params.name || '';
    const buses = await dbClient.buses.find().toArray();
    var busesPassing = [];
    for (let i = 0; i < buses.length; i++) {
      const busStation = buses[i].stations.find(station => station.name === stationName);
      if (busStation !== undefined) {
        busesPassing.push({ busId: buses[i].busId, timeRemaining: busStation.timeRemaining });
      }
    }
    return response.status(200).send(busesPassing);
  }

  static async getStationClosest(request, response) {
    const stationName = request.params.name || '';
    const buses = await dbClient.buses.find().toArray();
    var busesPassing = [];
    for (let i = 0; i < buses.length; i++) {
      const busStation = buses[i].stations.find(station => station.name === stationName);
      if (busStation !== undefined) {
        busesPassing.push({ busId: buses[i].busId, timeRemaining: busStation.timeRemaining[0] });
      }
    }
    let closestBus = null;
    let minTimeRemaining = Infinity;
    const timeToSeconds = (timeString) => {
      const [hours, minutes, seconds] = timeString.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    };
    busesPassing.forEach(bus => {
      const timeRemainingInSeconds = timeToSeconds(bus.timeRemaining);
      if (timeRemainingInSeconds < minTimeRemaining) {
        closestBus = bus;
        minTimeRemaining = timeRemainingInSeconds;
      }
    });
    return response.status(200).send(closestBus);
  }
}

module.exports = BusesController;
