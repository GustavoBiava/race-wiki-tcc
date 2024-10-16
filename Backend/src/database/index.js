import { Sequelize } from "sequelize";
import databaseConfig from '../config/database';

import Circuit from "../models/Circuit";
import Race from "../models/Race";
import Season from "../models/Season";
import Driver from "../models/Driver";
import DriverStat from "../models/DriverStat";
import Team from "../models/Team";
import Qualifying from "../models/Qualifying";
import Practice from "../models/Practice";
import CareerContracts from "../models/CareerContracts";
import TeamClassification from "../models/TeamClassification";
import DriverClassification from "../models/DriverClassification";
import TeamRaceResult from "../models/TeamRaceResult";
import DriverRaceResult from "../models/DriverRaceResult";
import DriverPracticeResult from "../models/DriverPracticeResult";
import DriverQualifyingResult from "../models/DriverQualifyingResult";

import User from "../models/Auth/User";

import Publication from "../models/Social/Publication";
import Like from '../models/Social/Like';
import Comment from "../models/Social/Comment";
import CommentsComment from "../models/Social/CommentsComment";
import Tag from "../models/Social/Tag";
import TagsPublication from "../models/Social/TagsPublication";

import DriverPicture from "../models/Pictures/DriverPicture";
import Country from "../models/Country";
import CountryPicture from "../models/Pictures/CountryPicture";
import TeamPicture from "../models/Pictures/TeamPicture";

const connection = new Sequelize(databaseConfig);
const models = [
  Circuit,
  Race,
  Season,
  Driver,
  DriverStat,
  Team,
  Qualifying,
  Practice,
  CareerContracts,
  TeamClassification,
  DriverClassification,
  TeamRaceResult,
  DriverRaceResult,
  DriverPracticeResult,
  DriverQualifyingResult,
  User,
  Publication,
  Like,
  Comment,
  CommentsComment,
  Tag,
  TagsPublication,
  DriverPicture,
  Country,
  CountryPicture,
  TeamPicture,
];

models.forEach(model => model.init(connection));

models.forEach((model) => model.associate && model.associate(connection.models));
