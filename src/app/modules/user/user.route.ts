import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getAllUsers,
);

router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.USER),
  UserController.getUserProfile,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.getSingleUser,
);

router.patch(
  '/my-profile',
  auth(ENUM_USER_ROLE.USER),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUserProfile,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.deleteUser,
);

export const UserRoutes = router;
