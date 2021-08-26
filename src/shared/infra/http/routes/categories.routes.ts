import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';

import ensureAdmin from '../middleware/ensureAdmin';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

import CreateCategoryController from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import ListCategoriesController from '../../../../modules/cars/useCases/listCategories/ListCategoriesController';
import ImportCategoryController from '../../../../modules/cars/useCases/importCategory/ImportCategoryController';

const upload = multer(uploadConfig.upload('./tmp/categories'));

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get('/', ensureAuthenticated, listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('file'),
  importCategoryController.handle
);

export default categoriesRoutes;
