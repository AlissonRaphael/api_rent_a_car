import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import ensureAdmin from '../middleware/ensureAdmin';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

import CreateCarController from '../../../../modules/cars/useCases/createCar/CreateCarController';
import ListAvailableCarsController from '../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import CreateCarSpecificationController from '../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import UploadCarImagesController from '../../../../modules/cars/useCases/uploadCarImageUseCase/UploadCarImagesController';

const carsRoutes = Router();

const uploadCarImages = multer(uploadConfig.upload('tmp/cars'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array('images'),
  uploadCarImagesController.handle
);

export default carsRoutes;
