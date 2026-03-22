import { Router } from 'express';
import healthRoutes from '#/routes/v1/health.routes.ts';

const router = Router();

router.use('/health', healthRoutes);

export default router;
