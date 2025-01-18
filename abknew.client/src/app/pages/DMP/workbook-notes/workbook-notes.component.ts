import { Component, ViewChild } from '@angular/core';
import { WorkbookNotes } from '../../../models/workbook-notes.model';
import { WorkbookNotesService } from '../../../services/workbook-notes.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { WorkbookNotesPopupComponent } from './workbook-notes-popup/workbook-notes-popup.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-workbook-notes',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './workbook-notes.component.html',
  styleUrl: './workbook-notes.component.css'
})
export class WorkbookNotesComponent
{
  taxes!: WorkbookNotes[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'note', 'updated_at', 'created_at', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: WorkbookNotesService,
    private dialog: MatDialog
  )
  {
    this.getWorkbookNotes();
  }

  getWorkbookNotes()
  {
    this.service.getWorkbookNote().subscribe(
      (result) =>
      {
        this.taxes = result;
        this.dataSource = new MatTableDataSource<WorkbookNotes>(this.taxes);
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
    var _popup = this.dialog.open(WorkbookNotesPopupComponent, {
      width: '40%',
      data: {
        header: header,
        id: id
      }
    });
    _popup.afterClosed().subscribe(item =>
    {
      this.getWorkbookNotes();
    });
  }

  editItem(id: any)
  {
    this.openPopup(id, 'Edit WorkbookNotes');
  }

  addWorkbookNotes()
  {
    this.openPopup(0, 'Add WorkbookNotes');
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
      this.service.deleteWorkbookNote(val).subscribe(
        (result) =>
        {
          if (result)
          {
            alert("WorkbookNotes deleted successfully!");
          }
          else
          {
            alert("WorkbookNotes not deleted!");
          }
        },
        (error) =>
        {
          console.error(error);
        }
      );
      this.getWorkbookNotes();
    }
  }

}
