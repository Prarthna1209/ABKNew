import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from '../../../material/material.module';
import { Router } from '@angular/router';
import { Shippings } from '../../../models/shippings.model';
import { ShippingsService } from '../../../services/shippings.service';
import { ShippingPopupComponent } from './shipping-popup/shipping-popup.component';

@Component({
  selector: 'app-shippings',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './shippings.component.html',
  styleUrl: './shippings.component.css'
})
export class ShippingsComponent
{
  type !: string;
  shippings !: Shippings[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private router: Router,
    private service: ShippingsService,
    private dialog: MatDialog
  )
  {
    this.type = this.router.url.split('/').pop() || '';
    this.getShippings();
  }

  getShippings()
  {
    this.service.getShippings(this.type).subscribe(
      (result) =>
      {
        this.shippings = result;
        this.dataSource = new MatTableDataSource<Shippings>(this.shippings);
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
    var _popup = this.dialog.open(ShippingPopupComponent, {
      width: '40%',
      data: {
        header: header,
        id: id,
        type: this.type
      }
    });
    _popup.afterClosed().subscribe(item =>
    {
      this.getShippings();
    });
  }

  editItem(id: any)
  {
    this.openPopup(id, 'Edit Shipping');
  }

  addShippings()
  {
    this.openPopup(0, 'Add Shipping');
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
      this.service.deleteShippings(val).subscribe(
        (result) =>
        {
          if (result)
          {
            alert("Shipping deleted successfully!");
          }
          else
          {
            alert("Shipping not deleted!");
          }
        },
        (error) =>
        {
          console.error(error);
        }
      );
      this.getShippings();
    }
  }

}
