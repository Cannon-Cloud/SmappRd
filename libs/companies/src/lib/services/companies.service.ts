import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/companies';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CompaniesService {
  apiURLCompanies = environment.apiURL + 'companies';
  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>('http://localhost:3000/companies');
  }

  getCompany(companyId: string): Observable<Company> {
    return this.http.get<Company>(
      `http://localhost:3000/companies/${companyId}`
    );
  }

  createCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.apiURLCompanies, company);
  }

  deleteCompany(companyId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURLCompanies}/${companyId}`);
  }

  updateCompany(company: Company): Observable<Company> {
    return this.http.patch<Company>(
      `${this.apiURLCompanies}/${company.id}`,
      company
    );
  }
}
