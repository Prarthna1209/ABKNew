import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Architect } from '../../../models/architect.model';
import { MaterialModule } from '../../../material/material.module';
import { ArchitectService } from '../../../services/architect.service';
import { ArchitectPopupComponent } from './architect-popup/architect-popup.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DS } from '../../../models/DS.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-architect',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './architect.component.html',
  styleUrl: './architect.component.css'
})
export class ArchitectComponent
{
  architects!: Architect[];
  dataSource: any;
  salesPersonDS!: DS[];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address', 'created_at', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: ArchitectService,
    private userService: UserService,
    private dialog: MatDialog
  )
  {
    this.getArchitects();
    this.getSalesPerson();
  }

  getArchitects()
  {
    this.service.getArchitectss().subscribe(
      (result) =>
      {
        this.architects = result;
        this.dataSource = new MatTableDataSource<Architect>(this.architects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  getSalesPerson()
  {
    this.userService.getSalesPersons().subscribe(
      (result) =>
      {
        this.salesPersonDS = result.map(item => ({ value: item.id, viewValue: `${item.firstName} ${item.lastName}` }));
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  openPopup(id: any, header: any): void
  {
    var _popup = this.dialog.open(ArchitectPopupComponent, {
      width: '40%',
      data: {
        header: header,
        id: id,
        spDS: this.salesPersonDS
      }
    });
    _popup.afterClosed().subscribe(item =>
    {
      this.getArchitects();
    });
  }

  editItem(id: any)
  {
    this.openPopup(id, 'Edit Architect');
  }

  addArchitects()
  {
    this.openPopup(0, 'Add Architect');
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
      this.service.deleteArchitects(val).subscribe(
        (result) =>
        {
          if (result)
          {
            alert("Architect deleted successfully!");
          }
          else
          {
            alert("Architect not deleted!");
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
