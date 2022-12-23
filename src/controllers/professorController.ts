import { Controller } from './controller';
import { Professor } from '../models/professor';

export class professorController extends Controller {
  constructor() {
    super(Professor);
  }
}