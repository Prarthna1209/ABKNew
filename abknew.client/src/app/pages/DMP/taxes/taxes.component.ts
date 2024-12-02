import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Taxes } from '../../../models/taxes.model';
import { MaterialModule } from '../../../material/material.module';
import { TaxesService } from '../../../services/taxes.service';
import { TaxPopupComponent } from './tax-popup/tax-popup.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-taxes',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './taxes.component.html',
  styleUrl: './taxes.component.css'
})
export class TaxesComponent
{
  taxes!: Taxes[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'region', 'rate', 'created_at', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: TaxesService,
    private dialog: MatDialog
  )
  {
    this.getTaxes();
  }

  getTaxes()
  {
    this.service.getTaxes().subscribe(
      (result) =>
      {
        this.taxes = result;
        this.dataSource = new MatTableDataSource<Taxes>(this.taxes);
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
    var _popup = this.dialog.open(TaxPopupComponent, {
      width: '40%',
      data: {
        header: header,
        id: id
      }
    });
    _popup.afterClosed().subscribe(item =>
    {
      this.getTaxes();
    });
  }

  editItem(id: any)
  {
    this.openPopup(id, 'Edit Tax');
  }

  addTaxes()
  {
    this.openPopup(0, 'Add Tax');
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
      this.service.deleteTaxes(val).subscribe(
        (result) =>
        {
          if (result)
          {
            alert("Tax deleted successfully!");
          }
          else
          {
            alert("Tax not deleted!");
          }
        },
        (error) =>
        {
          console.error(error);
        }
      );
    }
  }

}
