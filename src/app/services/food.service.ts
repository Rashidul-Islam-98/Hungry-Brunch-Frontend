import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ISaveFood } from "../models/save-food.model";

@Injectable({ providedIn: 'root' })
export class FoodService {
    isCartOpen = new Subject<boolean>();
    private orderedFoodsSubject = new BehaviorSubject<ISaveFood[]>([]);
    orderedFoods = this.orderedFoodsSubject.asObservable();

    orderFood(food: ISaveFood): void {
        const currentOrderedFoods = this.orderedFoodsSubject.value;
        this.orderedFoodsSubject.next([...currentOrderedFoods, food]);
    }

    deleteAllFoods(): void {
        this.orderedFoodsSubject.next([]);
    }

    deleteFood(food: ISaveFood): void {
        const currentOrderedFoods = this.orderedFoodsSubject.value;
        const updatedFoods = currentOrderedFoods.filter(item => item.id !== food.id);
        this.orderedFoodsSubject.next(updatedFoods);
    }
}