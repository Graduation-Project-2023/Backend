import { Request, Response, NextFunction } from "express";
import { Repo } from "../../db/repo";

export class Controller {
  constructor(protected repo: Repo<any, any, any, any>) {}

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await this.repo.read({ id });
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.repo.readMany();
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.repo.create(req.body);
      res.status(201).send(data);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await this.repo.update({ id }, req.body);
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;
      const data = await this.repo.delete({ id });
      res.status(200).send(data);
    } catch (err) {
      next(err);
    }
  };
}
