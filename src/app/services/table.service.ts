import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { baseUrl } from "src/environments/environment";
import { ITable } from "../models/table.model";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class TableService {
   table = new BehaviorSubject<ITable | null>(null);
   isAddEmployeeMode = new Subject<boolean>();
   constructor(private http: HttpClient) { }

   getTables() {
      return this.http.get<any>(`${baseUrl}table/datatable`);
   }

   deleteTable(id: number) {
      return this.http.delete(`${baseUrl}table/delete/${id}`);
   }
}