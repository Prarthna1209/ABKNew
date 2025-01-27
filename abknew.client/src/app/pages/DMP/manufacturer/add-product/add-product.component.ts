import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../material/material.module';
import { DS } from '../../../../models/DS.model';
import { DataService } from '../../../../services/data.service';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule,
    MaterialModule, MatSelectModule, CommonModule, MatExpansionModule, MatCardModule,
    MatDatepickerModule, MatNativeDateModule
  ]
})
export class AddProductComponent {
  inputData: any = { header: 'Add Product' };
  editData: any;
  minDate: Date = new Date(1970, 1, 1);
  today: Date = new Date();
  id: any;
  data: any;
  manufacturerId: string = '';

  constructor(
    private buildr: FormBuilder,
    private service: ProductService,
    private dataService: DataService,
    private router: Router
  )
  {
    this.data = dataService.getData();
    this.id = this.data.id;
    this.manufacturerId = this.data.manufacturerId ?? '';
  }

  getProducts()
  {
    this.service.getProductById(this.id).subscribe(
      (result) =>
      {
        //this.salespersons = result.map(item => ({ value: item.id, viewValue: `${item.firstName} ${item.lastName}` }));
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  ngOnInit(): void
  {
    this.inputData = this.dataService.getData();
    //this.getRoles();
    if (this.inputData?.id != undefined)
    {
      this.setPopupData(this.inputData.id);
    }
  }

  myform = this.buildr.group({
    id: this.buildr.control(''),
    manufacturerId: this.buildr.control(''),
    name: this.buildr.control(''),
    range1: this.buildr.control(''),
    range2: this.buildr.control(''),
    range3: this.buildr.control(''),
    comments: this.buildr.control(''),
    createdAt: this.buildr.control(''),
    updatedAt: this.buildr.control('')
  });

  setPopupData(id: any)
  {
    this.service.getProductById(id).subscribe(item =>
    {
      if (item != null)
      {
        this.editData = item;
        var obj = this.buildModel(this.editData);
        this.myform.setValue(obj);
      }
    });
  }

  addOrUpdate()
  {
    const id = this.myform.value.id || '';
    if (id != '')
    {
      this.updateProduct(id);
    }
    else
    {
      this.saveItem();
    }
    this.router.navigate(['products']);
  }

  buildModel(data: any)
  {
    var obj: any = {};
    if (data.id && data.id != "")
      obj["id"] = data.id;

    if (data.name && data.name != "")
      obj["name"] = data.name;
    else
      obj["name"] = "";

    if (data.range1 && data.range1 != "")
      obj["range1"] = data.range1;
    else
      obj["range1"] = "";

    if (data.range2 && data.range2 != "")
      obj["range2"] = data.range2;
    else
      obj["range2"] = "";

    if (data.range3 && data.range3 != "")
      obj["range3"] = data.range3;
    else
      obj["range3"] = "";

    if (data.comments && data.comments != "")
      obj["comments"] = data.comments;
    else
      obj["comments"] = "";

    if (data.manufacturerId && data.manufacturerId != "")
      obj["manufacturerId"] = data.manufacturerId;
    else
      obj["manufacturerId"] = "";

    if (data.createdAt && data.createdAt != "")
      obj["createdAt"] = data.createdAt;
    else
      obj["createdAt"] = null;

    if (data.updatedAt && data.updatedAt != "")
      obj["updatedAt"] = data.updatedAt;
    else
      obj["updatedAt"] = null;

    return obj;
  }

  updateProduct(id: any)
  {
    var item = this.buildModel(this.myform.value);
    item.manufacturerId = this.manufacturerId;
    this.service.updateProduct(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Product updated successfully!");
        }
        else
        {
          alert("Product not updated!");
        }
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  saveItem(): any
  {
    console.log(this.myform.value);
    var item = this.buildModel(this.myform.value);
    item.id = "";
    item.manufacturerId = this.manufacturerId;
    this.service.createProduct(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Product created successfully!");
        }
        else
        {
          alert("Product not created!");
        }
      },
      (error) =>
      {
        console.error(error);
        alert(error);
      }
    );
  }
}
