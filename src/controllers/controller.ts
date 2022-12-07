import { Request, Response, NextFunction } from "express";

export class Controller {
  constructor(protected model: any) {}

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await this.model.findUnique({
        where: { id },
      });
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.model.findMany();
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.model.create({
        data: req.body,
      });
      res.status(201).send(data);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await this.model.update({
        where: { id },
        data: req.body,
      });
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await this.model.delete({
        where: { id },
      });
      res.status(200).send(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}
