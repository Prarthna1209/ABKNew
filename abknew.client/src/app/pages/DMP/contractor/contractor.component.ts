import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ContractorPopupComponent } from './contractor-popup/contractor-popup.component';
import { Contractors } from '../../../models/contractors.model';
import { ContractorsService } from '../../../services/contractors.service';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '../../../material/material.module';
import { User } from '../../../models/user.model';
import { DS } from '../../../models/DS.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-contractor',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './contractor.component.html',
  styleUrl: './contractor.component.css'
})
export class ContractorComponent {
  contractors!: Contractors[];
  salesPersons!: User[];
  dataSource: any;
  salesPersonDS!: DS[];
  displayedColumns: string[] = ['id', 'name', 'city', 'phone', 'address', 'created_at', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: ContractorsService,
    private userService: UserService,
    private dialog: MatDialog
  )
  {
    this.getContractors();
    this.getSalesPerson();
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

  getContractors()
  {
    this.service.getContractor().subscribe(
      (result) =>
      {
        this.contractors = result;
        this.dataSource = new MatTableDataSource<Contractors>(this.contractors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  openPopup(id: any, header: any, ds: any): void
  {
    var _popup = this.dialog.open(ContractorPopupComponent, {
      width: '40%',
      data: {
        header: header,
        id: id,
        spDS: ds,
        isActiveLabel: 'Is Active?'
      }
    });
    _popup.afterClosed().subscribe(item =>
    {
      this.getContractors();
    });
  }

  editItem(id: any)
  {
    this.openPopup(id, 'Edit Contractors', this.salesPersonDS);
  }

  addContractors()
  {
    this.openPopup(0, 'Add Contractors', this.salesPersonDS);
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
      this.service.deleteContractor(val).subscribe(
        (result) =>
        {
          if (result)
          {
            alert("Contractors deleted successfully!");
          }
          else
          {
            alert("Contractors not deleted!");
          }
        },
        (error) =>
        {
          console.error(error);
        }
      );
      this.getContractors();
    }
  }
}
