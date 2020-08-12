import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { spacexPageModel } from './app.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [spacexPageModel]
})
export class AppComponent {
  spacexFiltersForm: FormGroup;
  constructor(private http: HttpClient, public data: spacexPageModel, public fb: FormBuilder) { }

  ngOnInit() {
    this.createReactiveForm();
    this.getData(null, null);
  }

  createReactiveForm() {
    this.spacexFiltersForm = this.fb.group({
      'year': [''],
      'launch': [''],
      'land': ['']
    });
  }

  getFilterValues() {
    this.data.url = 'https://api.spacexdata.com/v3/launches?limit=100';
    if (this.spacexFiltersForm.get('year').value) {
      this.data.url = this.data.url + '&' + 'launch_year=' + this.spacexFiltersForm.get('year').value;
    }
    if (this.spacexFiltersForm.get('launch').value) {
      this.data.url = this.data.url + '&' + 'launch_success=' + this.spacexFiltersForm.get('launch').value;
    }
    if (this.spacexFiltersForm.get('land').value) {
      this.data.url = this.data.url + '&' + 'land_success=' + this.spacexFiltersForm.get('land').value;
    }
  }

  getData(param, val) {
    this.getFilterValues();
    this.data.spacexLoadData = [];
    this.http.get(this.data.url).subscribe((resp) => {
      this.data.spacexLoadData = resp;
    });
  }
}

