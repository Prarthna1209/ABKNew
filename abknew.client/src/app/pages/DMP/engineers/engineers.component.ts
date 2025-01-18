import { Component, OnInit, ChangeDetectionStrategy, Input, ContentChild, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module'
import { EngineersService } from '../../../services/engineers.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Engineers } from '../../../models/engineers.model';
import { EngineerPopupComponent } from './engineer-popup/engineer-popup.component';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { DS } from '../../../models/DS.model';

@Component({
  selector: 'app-engineers',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './engineers.component.html',
  styleUrl: './engineers.component.css'
})
export class EngineersComponent {
  engineers!: Engineers[];
  salesPerson!: User[];
  salesPersonDS!: DS[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address', 'website', 'created_at', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: EngineersService,
    private userService: UserService,
    private dialog: MatDialog
  )
  {
    this.getEngineers();
    this.getSalesPerson();
  }

  getEngineers()
  {
    this.service.getEngineers().subscribe(
      (result) =>
      {
        this.engineers = result;
        this.dataSource = new MatTableDataSource<Engineers>(this.engineers);
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

  openPopup(id: any, header: any, ds: any): void
  {
    var _popup = this.dialog.open(EngineerPopupComponent, {
      width: '40%',
      data: {
        header: header,
        id: id,
        spDS: ds
      }
    });
    _popup.afterClosed().subscribe(item =>
    {
      this.getEngineers();
    });
  }

  editItem(id: any)
  {
    this.openPopup(id, 'Edit Engineer', this.salesPersonDS);
  }

  addEngineers()
  {
    this.openPopup(0, 'Add Engineer', this.salesPersonDS);
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
      this.service.deleteEngineer(val).subscribe(
        (result) =>
        {
          if (result)
          {
            alert("Engineer deleted successfully!");
          }
          else
          {
            alert("Engineer not deleted!");
          }
        },
        (error) =>
        {
          console.error(error);
        }
      );
      this.getEngineers();
    }
  }
}
