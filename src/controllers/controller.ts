import { Request, Response, NextFunction } from "express";

// abstract controller class
export abstract class Controller {
  constructor(protected model: any) {}

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const data = await this.model.get(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.model.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const data = await this.model.update(id, req.body);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const data = await this.model.delete(id);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
