import express from 'express';
import { resolve } from 'path';

import './database/';

import homeRoutes from './routes/homeRoutes';

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
    this.app.use('/', homeRoutes);
  }

}

export default new App().app;
