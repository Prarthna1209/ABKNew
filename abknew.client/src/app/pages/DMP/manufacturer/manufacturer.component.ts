import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { ManufacturerPopupComponent } from './manufacturer-popup/manufacturer-popup.component';
import { Manufecturers } from '../../../models/manufecturers.model';
import { ManufecturersService } from '../../../services/manufecturers.service';
import { MaterialModule } from '../../../material/material.module';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-manufacturer',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './manufacturer.component.html',
  styleUrl: './manufacturer.component.css'
})
export class ManufacturerComponent
{
  manufacturers!: Manufecturers[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'featured', 'count', 'updated_at', 'created_at', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: ManufecturersService,
    private dialog: MatDialog,
    private dataService: DataService,
    private router: Router
  )
  {
    this.getManufacturer();
  }

  getManufacturer()
  {
    this.service.getManufacturer().subscribe(
      (result) =>
      {
        this.manufacturers = result;
        this.dataSource = new MatTableDataSource<Manufecturers>(this.manufacturers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  openPopup(id: any, header: any): void
  {
    var _popup = this.dialog.open(ManufacturerPopupComponent, {
      width: '40%',
      data: {
        header: header,
        id: id
      }
    });
    _popup.afterClosed().subscribe(item =>
    {
      this.getManufacturer();
    });
  }

  editItem(id: any)
  {
    this.openPopup(id, 'Edit Manufacturer');
  }

  addManufacturer()
  {
    this.openPopup(0, 'Add Manufacturer');
  }

  addProduct(id: any)
  {
    this.dataService.setData({ manufacturerId: id });
    this.router.navigate(['products']);
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
      this.service.deleteManufacturer(val).subscribe(
        (result) =>
        {
          if (result)
          {
            alert("Manufacturer deleted successfully!");
          }
          else
          {
            alert("Manufacturer not deleted!");
          }
        },
        (error) =>
        {
          console.error(error);
        }
      );
      this.getManufacturer();
    }
  }
}
