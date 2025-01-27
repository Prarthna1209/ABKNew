import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../../material/material.module';
import { Takeoff } from '../../../models/takeoffs.model';
import { TakeoffService } from '../../../services/takeoff.service';
import { UserService } from '../../../services/user.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Import this!
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-quotes',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule,
    MaterialModule, MatSlideToggleModule
  ],
  templateUrl: './view-quotes.component.html',
  styleUrl: './view-quotes.component.css'
})
export class ViewQuotesComponent {
  takeoffs!: Takeoff[];
  dataSource: any;
  displayedColumns: string[] = [
    'info', 'worksheet', 'attachments', 'dueDate', 'jobId', 'worksheetId', 'submittalId',
    'jobName', 'jobAddress', 'engineer', 'architect', 'amount', 'specs', 'quotedBy', 'bidders'
  ];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;


  constructor(
    private service: TakeoffService,
    private userService: UserService,
    private dialog: MatDialog,
    private dataService: DataService,
    private router: Router
  )
  {
    this.getTakeoffs();
  }

  reloadPage()
  {
    location.reload();
  }

  getTakeoffs()
  {
    this.service.getQuotes().subscribe(
      (result) =>
      {
        this.takeoffs = result;
        this.dataSource = new MatTableDataSource<Takeoff>(this.takeoffs);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  openBidders(id: string) { }

  filetrChange(data: Event)
  {
    const val = (data.target as HTMLInputElement).value;
    this.dataSource.filter = val;
  }

  openWorksheet(takeoffId: string)
  {
    this.dataService.setData({ takeoffId });
    this.router.navigate(['worksheet-edit']);
  }
}
