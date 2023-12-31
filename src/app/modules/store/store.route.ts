import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { StoreController } from './store.controller';
import { StoreValidation } from './store.validation';

const router = express.Router();

router.post(
  '/create-store',
  validateRequest(StoreValidation.createStoreZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  StoreController.createStore,
);

router.get(
  '/isStoreExist',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  StoreController.isStoreExist,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  StoreController.getAllStores,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  StoreController.getSingleStore,
);

router.patch(
  '/:id',
  validateRequest(StoreValidation.updateStoreZodSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  StoreController.updateStore,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  StoreController.deleteStore,
);

export const StoreRoutes = router;
