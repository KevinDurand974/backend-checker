import { comparePassword, generateAccessToken, hashPassword } from '@helpers/auth';
import { validateRegisterData } from '@helpers/validator';
import isLogged from '@middlewares/isLogged';
import { addOneUser, selectOneUser } from '@models/user';
import { Router } from 'express';
import createError from 'http-errors';

const authRoute = Router();

// Register an User
authRoute.post('/register', async (req, res, next) => {
  try {
    const { email, password } = await validateRegisterData({ email: req.body.email, password: req.body.password });
    const hashedPassword = await hashPassword(password!);
    const data = await addOneUser({ email, password: hashedPassword, admin: false });
    if (!data) throw new Error('An error occurred, please try again.');
    res.status(200).json({
      status: 200,
      message: 'User successfully created!',
    });
  } catch (err) {
    next(err);
  }
});

// Register an User Admin
authRoute.post('/register/admin', async (req, res, next) => {
  try {
    const { email, password } = await validateRegisterData({ email: req.body.email, password: req.body.password });
    const hashedPassword = await hashPassword(password!);
    const data = await addOneUser({ email, password: hashedPassword, admin: true });
    if (!data) throw new Error('An error occurred, please try again.');
    res.status(200).json({
      status: 200,
      message: 'User successfully created!',
    });
  } catch (err) {
    next(err);
  }
});

// Login an User
authRoute.post('/login', isLogged as any, async (req, res, next) => {
  try {
    const { email, password, name, admin, user_id } = await selectOneUser(req.body.email);
    const checkPassword = comparePassword(req.body.password, password);
    if (!checkPassword) throw createError(403, 'Email or password is invalid, try again.');
    const token = generateAccessToken({ email, name, admin, user_id });
    res
      .cookie('ut', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      })
      .status(200)
      .json({
        status: 200,
        message: 'User successfully logged in!',
      });
  } catch (err) {
    next(err);
  }
});

// Logout an User
authRoute.get('/logout', (_, res) => {
  res
    .cookie('ut', '', {
      httpOnly: true,
      expires: new Date(Date.now() - 1),
    })
    .status(200)
    .json({
      status: 200,
      message: 'User successfully logged out!',
    });
});

export { authRoute };
