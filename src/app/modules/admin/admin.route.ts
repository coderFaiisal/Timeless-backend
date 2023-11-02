import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin,
);

router.post('/sign-in', validateRequest(AdminValidation.signInAdinZodSchema));

router.post(
  '/refresh-token',
  validateRequest(AdminValidation.refreshTokenZodSchema),
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN));

router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.getAdminProfile,
);

router.get('/:id', auth(ENUM_USER_ROLE.ADMIN));

router.patch(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdminProfile,
);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN));

export const AdminRoutes = router;
