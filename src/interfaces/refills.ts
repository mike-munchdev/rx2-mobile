export interface IRefill {
  id: string;
  drugName: string;
  drugDose: number;
  lastFilled: Date;
  rxNumber: string;
}
