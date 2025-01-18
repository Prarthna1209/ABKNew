import { ChangeDetectionStrategy, Component, ViewChild, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { MaterialModule } from '../../../material/material.module';
import { ShippingItemService } from '../../../services/shipping-item.service';
import { PopupComponent } from './popup/popup.component';
interface ShippingItem
{
  id: string,
  title: string,
  created_by: string,
  created_at: string,
  updated_by: string
}

@Component({
  selector: 'app-shipping-item',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './shipping-item.component.html',
  styleUrl: './shipping-item.component.css',
})
export class ShippingItemComponent
{
  shippingItems !: ShippingItem[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'title', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(
    private service: ShippingItemService,
    private dialog: MatDialog
  )
  {
    this.getShippingItems();
  }

  displayStyle = "none";

  openPopup(id: any, header: any): void
  {
    var _popup = this.dialog.open(PopupComponent, {
      width: '40%',
      data: {
        header: header,
        id: id
      }
    });
    _popup.afterClosed().subscribe(item =>
    {
      this.getShippingItems();
    });
  }

  getShippingItems()
  {
    this.service.getShippingItems().subscribe((result) =>
    {
      this.shippingItems = result;
      this.dataSource = new MatTableDataSource<ShippingItem>(this.shippingItems);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  filetrChange(data: Event)
  {
    const val = (data.target as HTMLInputElement).value;
    this.dataSource.filter = val;
  }

  getShippingItem(val: any)
  {
    this.service.getShippingItemById(val).subscribe(
      (result) =>
      {
        (document.getElementById("ShippingItemId") as HTMLInputElement).value = result.id.toString();
        (document.getElementById("Title") as HTMLInputElement).value = result.title;
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  editItem(id: any)
  {
    this.openPopup(id, 'Edit Shipping Item');
  }

  addItem()
  {
    this.openPopup(0, 'Add Shipping Item');
  }

  addOrUpdate()
  {
    const id = (document.getElementById("id") as HTMLInputElement).value;
    if (id != '')
    {
      this.updateShippingItem(id);
    }
    else
    {
      this.addShippingItem();
    }
  }

  updateShippingItem(id: any)
  {
    var item = {
      id: id,
      title: (document.getElementById("title") as HTMLInputElement).value,
      updated_by: "2",
      created_by: "",
      created_at: ""
    };
    this.service.updateShippingItem(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Shipping item updated successfully!");
        }
        else
        {
          alert("Shipping item not updated!");
        }
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  deleteItem(val: any)
  {
    if (confirm('Are you sure you want to delete this item?'))
    {
      this.service.deleteShippingItem(val).subscribe(
        (result) =>
        {
          if (result)
          {
            alert("Shipping item deleted successfully!");
          }
          else
          {
            alert("Shipping item not deleted!");
          }
        },
        (error) =>
        {
          console.error(error);
        }
      );
      this.getShippingItems();
    }
  }

  addShippingItem()
  {
    var item = {
      id: '',
      title: (document.getElementById("title") as HTMLInputElement).value,
      updated_by: "",
      created_by: "1",
      created_at: new Date().toISOString()
    };
    this.service.createShippingItem(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("Shipping item created successfully!");
        }
        else
        {
          alert("Shipping item not created!");
        }
        this.getShippingItems();
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

}

