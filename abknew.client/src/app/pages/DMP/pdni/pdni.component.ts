import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pdni } from '../../../models/pdni.model';
import { PdniService } from '../../../services/pdni.service';
import { PdniPopupComponent } from './pdni-popup/pdni-popup.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-pdni',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './pdni.component.html',
  styleUrl: './pdni.component.css'
})
export class PdniComponent {
  pdni!: Pdni[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'updated_at', 'created_at', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: PdniService,
    private dialog: MatDialog
  )
  {
    this.getPdni();
  }

  getPdni()
  {
    this.service.getPdni().subscribe(
      (result) =>
      {
        this.pdni = result;
        this.dataSource = new MatTableDataSource<Pdni>(this.pdni);
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
    var _popup = this.dialog.open(PdniPopupComponent, {
      width: '40%',
      data: {
        header: header,
        id: id
      }
    });
    _popup.afterClosed().subscribe(item =>
    {
      this.getPdni();
    });
  }

  editItem(id: any)
  {
    this.openPopup(id, 'Edit Pdni');
  }

  addPdni()
  {
    this.openPopup(0, 'Add Pdni');
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
      this.service.deletePdni(val).subscribe(
        (result) =>
        {
          if (result)
          {
            alert("Pdni deleted successfully!");
          }
          else
          {
            alert("Pdni not deleted!");
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
