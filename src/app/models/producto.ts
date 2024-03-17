export class Producto {
  id: string;
  name: string;
  mode: string;
  equipment: string[];
  exercises: string[];
  trainerTips: string[];

  constructor(id: string, name: string, mode: string, equipment: string[], exercises: string[], trainerTips: string[]) {
    this.id = id;
    this.name = name;
    this.mode = mode;
    this.exercises = exercises;
    this.equipment = equipment;
    this.trainerTips = trainerTips;
  }
}
