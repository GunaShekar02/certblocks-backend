import { Request, Response, NextFunction } from 'express';

export class Controller {
  async login(_: Request, res: Response, next: NextFunction) {
    try {
      res.status(200).json({ message: 'Successfully logged in' });
    } catch (err) {
      next(err);
    }
  }
}

export default new Controller();
