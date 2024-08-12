import { Sequelize } from "sequelize";
import databaseConfig from '../config/database';

const connection = new Sequelize(databaseConfig);
const models = [];

models.forEach(model => model.init(connection));
