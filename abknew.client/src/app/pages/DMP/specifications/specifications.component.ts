import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../../material/material.module';
import { Specifications } from '../../../models/specifications.model';
import { SpecificationsService } from '../../../services/specifications.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { SpecificationsPopupComponent } from './specifications-popup/specifications-popup.component';

@Component({
  selector: 'app-specifications',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './specifications.component.html',
  styleUrl: './specifications.component.css'
})
export class SpecificationsComponent {
  type !: string;
  shippings !: Specifications[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'created_at', 'updated_at', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private router: Router,
    private service: SpecificationsService,
    private dialog: MatDialog
  )
  {
    this.getSpecifications();
  }

  getSpecifications()
  {
    this.service.getSpecification().subscribe(
      (result) =>
      {
        this.shippings = result;
        this.dataSource = new MatTableDataSource<Specifications>(this.shippings);
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
    var _popup = this.dialog.open(SpecificationsPopupComponent, {
      width: '40%',
      data: {
        header: header,
        id: id,
        type: this.type
      }
    });
    _popup.afterClosed().subscribe(item =>
    {
      this.getSpecifications();
    });
  }

  editItem(id: any)
  {
    this.openPopup(id, 'Edit Specification');
  }

  addSpecifications()
  {
    this.openPopup(0, 'Add Specification');
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
      this.service.deleteSpecification(val).subscribe(
        (result) =>
        {
          if (result)
          {
            alert("Specification deleted successfully!");
          }
          else
          {
            alert("Specification not deleted!");
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
