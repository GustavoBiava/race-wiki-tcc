import express from 'express';
import { resolve } from 'path';
import cors from 'cors';

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
import driverPracticeResultRoutes from './routes/driverPracticeResultRoutes';
import driverQualifyingResultRoutes from './routes/driverQualifyingResultRoutes';
import driverRaceResultRoutes from './routes/driverRaceResultRoutes';
import teamRaceResultRoutes from './routes/teamRaceResultRoutes';
import driverClassificationRoutes from './routes/driverClassificationRoutes';
import teamClassificationRoutes from './routes/teamClassificationRoutes';
import countryRoutes from './routes/countryRoutes';

import userRoutes from './routes/Auth/userRoutes';
import tokenRoutes from './routes/Auth/tokenRoutes';

import publicationRoutes from './routes/Social/publicationRoutes';
import likeRoutes from './routes/Social/likeRoutes';
import commentRoutes from './routes/Social/commentRoutes';
import commentsCommentRoutes from './routes/Social/commentsCommentRoutes';
import tagRoutes from './routes/Social/tagRoutes';
import tagsPublicationRoutes from './routes/Social/tagsPublicationRoutes';

import picturesRoutes from './routes/Pictures/picturesRoutes';

import driversPageRoutes from './routes/Pages/driversPageRoutes';
import teamsPageRoutes from './routes/Pages/teamsPageRoutes';
import favoriteTeamPageRoutes from './routes/Pages/favoriteTeamPageRoutes';
import favoriteDriverPageRoutes from './routes/Pages/favoriteDriverPageRoutes';
import registerPageRoutes from './routes/Pages/registerPageRoutes';
import homePageRoutes from './routes/Pages/homePageRoutes';
import navbarRoutes from './routes/Pages/navbarRoutes';
import publicationPageRoutes from './routes/Pages/publicationPageRoutes';
import driverPageRoutes from './routes/Pages/driverPageRoutes';
import teamPageRoutes from './routes/Pages/teamPageRoutes';
import racePageRoutes from './routes/Pages/racePageRoutes';
import profilePageRoutes from './routes/Pages/profilePageRoutes';
import comparationPageRoutes from './routes/Pages/comparationPageRoutes';

class App {

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads')));
    this.app.use(cors({ origin: 'http://localhost:5173', optionsSuccessStatus: 200 }));
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
    this.app.use('/driverPracticeResults', driverPracticeResultRoutes);
    this.app.use('/driverQualifyingResults', driverQualifyingResultRoutes);
    this.app.use('/driverRaceResults', driverRaceResultRoutes);
    this.app.use('/teamRaceResults', teamRaceResultRoutes);
    this.app.use('/driverClassifications', driverClassificationRoutes);
    this.app.use('/teamClassifications', teamClassificationRoutes);
    this.app.use('/countries', countryRoutes);

    this.app.use('/users', userRoutes);
    this.app.use('/tokens', tokenRoutes);

    this.app.use('/publications', publicationRoutes);
    this.app.use('/likes', likeRoutes);
    this.app.use('/comments', commentRoutes);
    this.app.use('/commentsComments', commentsCommentRoutes);
    this.app.use('/tags', tagRoutes);
    this.app.use('/tagsPublications', tagsPublicationRoutes);

    this.app.use('/pictures', picturesRoutes);

    this.app.use('/pages/drivers', driversPageRoutes);
    this.app.use('/pages/teams', teamsPageRoutes);
    this.app.use('/pages/favoriteTeams', favoriteTeamPageRoutes);
    this.app.use('/pages/favoriteDrivers', favoriteDriverPageRoutes);
    this.app.use('/pages/register', registerPageRoutes);
    this.app.use('/pages/home', homePageRoutes);
    this.app.use('/pages/navbar', navbarRoutes);
    this.app.use('/pages/publication', publicationPageRoutes);
    this.app.use('/pages/driver', driverPageRoutes);
    this.app.use('/pages/team', teamPageRoutes);
    this.app.use('/pages/race', racePageRoutes);
    this.app.use('/pages/profile', profilePageRoutes);
    this.app.use('/pages/comparation', comparationPageRoutes);
  }

}

export default new App().app;
