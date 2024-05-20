import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class OrderService {
    isOrderConfirmed = new Subject<boolean>();
}