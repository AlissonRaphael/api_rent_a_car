import { Router } from 'express';

import authenticateRoutes from './authenticate.routes';
import carsRoutes from './cars.routes';
import categoriesRoutes from './categories.routes';
import passwordRoutes from './password.routes';
import rentalRoutes from './rental.routes';
import specificationRoutes from './specification.routes';
import usersRoutes from './users.routes';

const router = Router();

router.use('/sessions', authenticateRoutes);
router.use('/cars', carsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/password', passwordRoutes);
router.use('/rentals', rentalRoutes);
router.use('/specification', specificationRoutes);
router.use('/users', usersRoutes);

export default router;
