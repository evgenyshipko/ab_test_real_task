import { Router } from 'express';
import UserDatesController from '../controllers/UserDates.controller';

export const userDatesRouter = (router: Router) => {
    const userDatesRouter = Router();

    userDatesRouter.get('/', UserDatesController.getAll);
    userDatesRouter.get(
        '/rollingRetention/:days',
        UserDatesController.calculateRollingRetention
    );
    userDatesRouter.post('/', UserDatesController.setAll);
    userDatesRouter.delete('/', UserDatesController.deleteAll);

    router.use('/userDates', userDatesRouter);
};
