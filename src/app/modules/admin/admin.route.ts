import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.post(
  '/create-admin',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin,
);

router.post(
  '/sign-in',
  validateRequest(AdminValidation.signInAdinZodSchema),
  AdminController.signInAdmin,
);

router.post(
  '/change-password',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AdminValidation.changeAdminPasswordZodSchema),
  AdminController.changePassword,
);

router.post(
  '/refresh-token',
  validateRequest(AdminValidation.refreshTokenZodSchema),
  AdminController.refreshToken,
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getAllAdmins,
);

router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getAdminProfile,
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.getSingleAdmin,
);

router.patch(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdminProfile,
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AdminController.deleteAdmin,
);

export const AdminRoutes = router;
