import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '../../material/material.module';

import { EmailTemplates } from '../../models/email-template.model';
import { EmailTemplateServie } from '../../services/email-templates.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-email-templates',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule, MaterialModule
  ],
  templateUrl: './email-templates.component.html',
  styleUrl: './email-templates.component.css'
})
export class EmailTemplatesComponent 
{
  architects!: EmailTemplates[];
  mailableArr: any;
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'subject', 'created_at', 'updated_at', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: EmailTemplateServie,
    private router: Router,
    private dataService: DataService,
  )
  {
    this.getEmailTemplatess();
  }

  getEmailTemplatess()
  {
    this.service.getEmailTemplates().subscribe(
      (result) =>
      {
        this.architects = result;
        this.dataSource = new MatTableDataSource<EmailTemplates>(this.architects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  openPopup(data: EmailTemplates)
  {
    this.mailableArr = data.mailable.split('\\');
    this.dataService.setData({
      id: data.id, subject: data.subject, name: data.name,
      mailableFull: data.mailable, htmlTemplate: data.htmlTemplate,
      textTemplate: data.textTemplate,
      mailable: this.mailableArr[this.mailableArr.length - 1]
    });
    this.router.navigate(['email-editor']);
  }

  editItem(data: EmailTemplates)
  {
    this.openPopup(data);
  }

  addEmailTemplate()
  {
    const template: EmailTemplates = {
      id: '',
      htmlTemplate: 'Add EmailTemplates',
      created_at: '',
      mailable: '',
      name: '',
      subject: '',
      textTemplate: '',
      updated_at:''
    }
    this.openPopup(template);
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
      this.service.deleteEmailTemplatess(val).subscribe(
        (result) =>
        {
          if (result)
          {
            alert("EmailTemplates deleted successfully!");
          }
          else
          {
            alert("EmailTemplates not deleted!");
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
