import { Router } from 'express';
import { userDatesRouter } from './userDatesRouter';

const apiRouter = Router();

userDatesRouter(apiRouter);

export { apiRouter };
