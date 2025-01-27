import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../material/material.module';
import { DS } from '../../../models/DS.model';
import { Takeoff } from '../../../models/takeoffs.model';
import { TakeoffService } from '../../../services/takeoff.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-pending-takeoffs',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './pending-takeoffs.component.html',
  styleUrl: './pending-takeoffs.component.css'
})
export class PendingTakeoffsComponent {
  takeoffs!: Takeoff[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address', 'created_at', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: TakeoffService,
    private userService: UserService,
    private dialog: MatDialog
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
    this.service.getPendingQuotes().subscribe(
      (result) =>
      {
        //this.takeoffs = result;
        //this.dataSource = new MatTableDataSource<Takeoff>(this.takeoffs);
        //this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  openPopup(id: any, header: any): void
  {
    //var _popup = this.dialog.open(TakeoffPopupComponent, {
    //  width: '40%',
    //  data: {
    //    header: header,
    //    id: id,
    //    spDS: this.salesPersonDS
    //  }
    //});
    //_popup.afterClosed().subscribe(item =>
    //{
    //  this.getTakeoffs();
    //});
  }

  addTakeoffs() { }

  editItem(id: any) { }

  deleteItem(id: any) { }


  filetrChange(data: Event)
  {
    const val = (data.target as HTMLInputElement).value;
    this.dataSource.filter = val;
  }

}
