import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import BusesController from '../controllers/BusesController';

const express = require('express');

const router = express.Router();

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);

router.post('/users', UsersController.postNew);
router.get('/users/me', UsersController.getMe);

router.get('/buses', BusesController.getBuses);
router.get('/buses/:id', BusesController.getBusId);
router.get('/stations/:name', BusesController.getStation);
router.get('/stations/:name/closest', BusesController.getStationClosest);

module.exports = router;
