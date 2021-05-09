import { Router } from 'express';
import UserDatesController from '../controllers/UserDates.controller';

export const userDatesRouter = (router: Router) => {
    const userDatesRouter = Router();

    userDatesRouter.get('/', UserDatesController.getAll);
    userDatesRouter.post('/', UserDatesController.setAll);
    userDatesRouter.delete('/:userId', UserDatesController.deleteByUserId);

    router.use('/userDates', userDatesRouter);
};
