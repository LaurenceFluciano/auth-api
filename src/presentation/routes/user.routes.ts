import express from 'express';
const router = express.Router();
import { Request, Response } from 'express';

const testRoute = (req: Request, res: Response) =>
  res.status(200).json({ message: 'Test Route: Must to be implmented' });

router.route('/').get(testRoute).post(testRoute);

router.route('/:id').get(testRoute);
