import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompaniesService, Company } from '@smapp/companies';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'smapp-companies',
  templateUrl: './companies.component.html',
  styles: [],
})
export class CompaniesComponent implements OnInit, OnDestroy {
  companies: Company[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(
    private companiesService: CompaniesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._getCompanies();
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  deleteCompany(companyId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this company?',
      header: 'Delete Company',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.companiesService.deleteCompany(companyId).subscribe(
          () => {
            this._getCompanies();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Company Successfuly Deleted',
            });
          },
          (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Company could not be deleted ${error}`,
            });
          }
        );
      },
    });
  }

  updateCompany(companyId: string) {
    this.router.navigateByUrl(`companies/form/${companyId}`);
  }

  private _getCompanies() {
    this.companiesService
      .getCompanies()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((companies) => {
        this.companies = companies;
      });
  }
}
