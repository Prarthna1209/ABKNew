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

import { Bidder } from '../../../models/bidder.model';
import { MaterialModule } from '../../../material/material.module';
import { BidderService } from '../../../services/bidder.service';
import { BidderPopupComponent } from './bidder-popup/bidder-popup.component';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { DS } from '../../../models/DS.model';


@Component({
  selector: 'app-bidder',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './bidder.component.html',
  styleUrl: './bidder.component.css'
})

export class BidderComponent {
  bidders!: Bidder[];
  salesPersons!: User[];
  dataSource: any;
  salesPersonDS!: DS[];
  displayedColumns: string[] = ['id', 'name', 'company', 'email', 'phone', 'address', 'created_at', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  constructor(
    private service: BidderService,
    private userService: UserService,
    private dialog: MatDialog
  )
  {
    this.getBidders();
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

  getBidders()
  {
    this.service.getBidders().subscribe(
      (result) =>
      {
        this.bidders = result;
        this.dataSource = new MatTableDataSource<Bidder>(this.bidders);
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
    var _popup = this.dialog.open(BidderPopupComponent, {
      width: '40%',
      data: {
        header: header,
        id: id,
        spDS: ds
      }
    });
    _popup.afterClosed().subscribe(item =>
    {
      this.getBidders();
    });
  }

  editItem(id: any)
  {
    this.openPopup(id, 'Edit Bidder', this.salesPersonDS);
  }

  addBidders()
  {
    this.openPopup(0, 'Add Bidder', this.salesPersonDS);
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
      this.service.deleteBidder(val).subscribe(
        (result) =>
        {
          if (result)
          {
            alert("Bidder deleted successfully!");
          }
          else
          {
            alert("Bidder not deleted!");
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
