import { ISaveFood } from "./save-food.model";

export interface IGetFoods {
  totalItems: number,
  items: number,
  from: number,
  to: number,
  totalPages: number,
  currentPage: number,
  itemPerPage: number,
  data: ISaveFood[]
}