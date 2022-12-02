import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const team = Router();

team.get('/', TeamController.findTeams);

export default team;
