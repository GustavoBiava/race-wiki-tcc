import express from 'express';
import { resolve } from 'path';

import './database/';

import circuitRoutes from './routes/circuitRoutes';
import driverStatRoutes from './routes/driverStatRoutes';
import driverRoutes from './routes/driverRoutes';
import teamRoutes from './routes/teamRoutes';
import seasonRoutes from './routes/seasonRoutes';
import raceRoutes from './routes/raceRoutes';
import practiceRoutes from './routes/practiceRoutes';
import qualifyingRoutes from './routes/qualifyingRoutes';
import careerContractsRoutes from './routes/careerContractRoutes';

class App {

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'static')));
  }

  routes() {
    this.app.use('/circuits', circuitRoutes);
    this.app.use('/driverStats', driverStatRoutes);
    this.app.use('/drivers', driverRoutes);
    this.app.use('/teams', teamRoutes);
    this.app.use('/seasons', seasonRoutes);
    this.app.use('/races', raceRoutes);
    this.app.use('/practices', practiceRoutes);
    this.app.use('/qualifiers', qualifyingRoutes);
    this.app.use('/careerContracts', careerContractsRoutes);
  }

}

export default new App().app;
