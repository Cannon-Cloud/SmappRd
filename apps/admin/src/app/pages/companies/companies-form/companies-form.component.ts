import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CompaniesService, Company } from '@smapp/companies';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'smapp-companies-form',
  templateUrl: './companies-form.component.html',
  styles: [],
})
export class CompaniesFormComponent implements OnInit {
  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCompanyId: string | undefined;
  status = 'NEW';
  statusObjects = [{}];

  constructor(
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private companiesService: CompaniesService,
    private location: Location,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._checkEditMode();
    this.statusObjects = [
      { status: 'NEW', inactive: false },
      { status: 'UPDATED', inactive: !this.editMode },
      { status: 'CLOSED', inactive: !this.editMode },
    ];
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
      return console.log('error on submit');
    }
    const company: Company = {
      id: this.currentCompanyId,
      title: this.companyForm.title.value,
      description: this.companyForm.description.value,
      city: this.companyForm.city.value,
      status: this.companyForm.status.value,
    };
    if (this.editMode) {
      this._updateCompany(company);
    } else {
      this._addCompany(company);
    }
  }

  onCancel() {
    this.location.back();
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering

  private _initForm() {
    this.editMode = false;
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      city: ['', Validators.required],
      status: ['NEW'],
    });
  }

  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params.id) {
        this.editMode = true;
        this.currentCompanyId = params.id;
        this.companiesService.getCompany(params.id).subscribe((company) => {
          this.companyForm.title.setValue(company.title);
          this.companyForm.description.setValue(company.description);
          this.companyForm.city.setValue(company.city);
          this.companyForm.status.setValue(company.status);
        });
      }
    });
  }

  private _addCompany(company: Company) {
    this.companiesService.createCompany(company).subscribe(
      (company: Company) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Company ${company.title} was created`,
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Company${company.title} could not be created.`,
        })
    );
  }

  private _updateCompany(company: Company) {
    this.companiesService.updateCompany(company).subscribe(
      () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Company Updated',
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      },
      () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not update comapny',
        })
    );
  }

  get companyForm() {
    return this.form.controls;
  }
}
