import { Sequelize } from "sequelize";
import databaseConfig from '../config/database';

import Circuit from "../models/Circuit";
import Race from "../models/Race";
import Season from "../models/Season";
import Driver from "../models/Driver";

const connection = new Sequelize(databaseConfig);
const models = [Circuit, Race, Season, Driver];

models.forEach(model => model.init(connection));

models.forEach((model) => model.associate && model.associate(connection.models));
