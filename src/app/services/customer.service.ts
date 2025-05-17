import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customer} from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  backendHost:string="http://localhost:8085";
  constructor(private http:HttpClient) { }


  public getCustomers():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.backendHost+"/customers");
  }


  public searchCustomers(keyword:string):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.backendHost+"/customers/search?keyword="+keyword);
  }

  public saveCustomers(customer:Customer):Observable<Array<Customer>>{
    return this.http.post<Array<Customer>>(this.backendHost+"/customers",customer);
  }
  public deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.backendHost}/customers/${id}`);
  }


}
