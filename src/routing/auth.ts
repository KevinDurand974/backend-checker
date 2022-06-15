import { Router } from 'express';
import { validateRegisterData } from '@helpers/validator';
import { hashPassword } from '@helpers/auth';
import { createUser } from '@src/models/user';

const authRoute = Router();

// Register an User
authRoute.post('/register', async (req, res, next) => {
  try {
    const { email, password } = await validateRegisterData({ email: req.body.email, password: req.body.password });
    const hashedPassword = await hashPassword(password);
    const data = await createUser({ email, password: hashedPassword });
    if (!data) throw new Error('Unknow error!');
    res.status(200).json({
      status: 200,
      message: 'User successfully created!',
      data: data,
    });
  } catch (err) {
    next(err);
  }
});

export { authRoute };
