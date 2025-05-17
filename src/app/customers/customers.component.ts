import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CustomerService} from '../services/customer.service';
import {Observable} from 'rxjs';
import {Customer} from '../model/customer.model';
import {pipe, throwError,catchError} from 'rxjs';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers!: Observable<Array<Customer>>;
  errorMessage!: string;
  searchFormGroup:FormGroup | undefined;

  constructor(private customerService:CustomerService , private fb: FormBuilder){}
  ngOnInit() {

    this.searchFormGroup = this.fb.group({
keyword: this.fb.control(''),

    });

this.customers=this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );

}

  handlSearchCustomers() {
let kw=this.searchFormGroup?.value.keyword;
this.customers=this.customerService.searchCustomers(kw).pipe(
  catchError(err => {
    this.errorMessage = err.message;
    return throwError(err);
  })
);
  }
  handleDeleteCustomer(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce client ?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => this.loadCustomers(),  // Recharge la liste après suppression
        error: err => {
          console.error(err);
          this.errorMessage = "Erreur lors de la suppression.";
        }
      });
    }
  }
  loadCustomers() {
    this.customers = this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

}
