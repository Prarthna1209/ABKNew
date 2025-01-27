import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../../material/material.module';
import { DataService } from '../../../../services/data.service';
import { Product } from '../../../../models/products.model';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  styleUrl: './product.component.css'
})
export class ProductComponent {
  products!: Product[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'range1', 'range2', 'range3', 'createdAt', 'updatedAt', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  manufacturerId!: string;
  data: any;
  constructor(
    private service: ProductService,
    private dialog: MatDialog,
    private dataService: DataService,
    private router: Router
  )
  {
    this.data = dataService.getData();
    this.manufacturerId = this.data.manufacturerId;
    this.getProduct();
  }

  getProduct()
  {
    this.service.getProduct(this.manufacturerId).subscribe(
      (result) =>
      {
        this.products = result;
        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  editItem(id: any)
  {
    this.dataService.setData({ manufacturerId: this.manufacturerId,productId: id });
    this.router.navigate(['add-products']);
  }

  addProduct()
  {
    this.dataService.setData({ manufacturerId: this.manufacturerId });
    this.router.navigate(['add-products']);
  }

  filetrChange(data: Event)
  {
    const val = (data.target as HTMLInputElement).value;
    this.dataSource.filter = val;
  }

  deleteItem(val: any)
  {
    if (confirm('Are you sure you want to delete this item?'))
    {
      this.service.deleteProduct(val).subscribe(
        (result) =>
        {
          if (result)
          {
            alert("Product deleted successfully!");
          }
          else
          {
            alert("Product not deleted!");
          }
        },
        (error) =>
        {
          console.error(error);
        }
      );
      this.getProduct();
    }
  }
}
