import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pm } from '../../../models/pm.model';
import { PmService } from '../../../services/pm.service';
import { PmPopupComponent } from './pm-popup/pm-popup.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '../../../material/material.module';
import { DS } from '../../../models/DS.model';
import { Contractors } from '../../../models/contractors.model';
import { ContractorsService } from '../../../services/contractors.service';

@Component({
  selector: 'app-pm',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './pm.component.html',
  styleUrl: './pm.component.css'
})
export class PmComponent
{
  bidders!: Pm[];
  dataSource: any;
  salesPersons!: Contractors[];
  listDS!: DS[];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'createdAt', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: PmService,
    private dialog: MatDialog,
    private contractorService: ContractorsService
  )
  {
    this.getPMs();
    this.getContractors();
  }

  getContractors()
  {
    this.contractorService.getContractor().subscribe(
      (result) =>
      {
        this.listDS = result.map(item => ({ value: item.id, viewValue: `${item.firstName} ${item.lastName}` }));
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  getPMs()
  {
    this.service.getPM().subscribe(
      (result) =>
      {
        this.bidders = result;
        this.dataSource = new MatTableDataSource<Pm>(this.bidders);
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
    var _popup = this.dialog.open(PmPopupComponent, {
      width: '40%',
      data: {
        header: header,
        id: id,
        contractors: this.listDS
      }
    });
    _popup.afterClosed().subscribe(item =>
    {
      this.getPMs();
    });
  }

  editItem(id: any)
  {
    this.openPopup(id, 'Edit PM');
  }

  addPMs()
  {
    this.openPopup(0, 'Add PM');
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
      this.service.deletePM(val).subscribe(
        (result) =>
        {
          if (result)
          {
            alert("PM deleted successfully!");
          }
          else
          {
            alert("PM not deleted!");
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
