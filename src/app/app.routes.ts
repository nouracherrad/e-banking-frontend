import { Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import {NewCustomerComponent} from './new-customer/new-customer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {LoginFormComponent} from './login-form/login-form.component';
import {AdminTemplateComponent} from './admin-template/admin-template.component';
import {AuthorizationGuard} from './guards/authorization.guard';
import {NotAuthorizedComponent} from './not-authorized/not-authorized.component';
export const routes: Routes = [
  { path: "login", component: LoginFormComponent },
  { path: "", redirectTo: "/login", pathMatch: 'full' },
  {path: "admin", component: AdminTemplateComponent, children: [
      { path: "navbar", component: NavbarComponent },
      { path: "customers", component: CustomersComponent },
      { path: "accounts", component: AccountsComponent },
      { path: "new-customer", component: NewCustomerComponent ,canActivate:[AuthorizationGuard],data:{role:"ADMIN"}},
      {path:"notAutorized",component:NotAuthorizedComponent},
    ]
  }
];
