import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../../services/data.service';
import { Documents } from '../../models/documents.model';
import { DocumentsService } from '../../services/documnets.service';

interface UploadedFile
{
  name: string;
  size?: number;
  type: string;
  file?: File;
}


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent
{
  displayedColumns: string[] = ['name', 'size', 'type', 'actions'];
  dataSource = new MatTableDataSource<UploadedFile>([]);
  totalSize = 0;
  selectedFiles: any = [];
  takeoffId: any;
  data: any;

  constructor(
    private dataService: DataService,
    private serivce: DocumentsService
  ) { }

  ngOnInit()
  {
    this.data = this.dataService.getData();
    const sectionId = this.data?.sectionId;
    if (sectionId != undefined)
    {
      this.serivce.getDocuments(sectionId).subscribe((items) =>
      {
        for (let i = 0; i < items.length; i++)
        {
          const file = items[i];
          let uploadedFile: UploadedFile = {
            name: file.filename,
            file: undefined,
            type: file.type,
            size: file.size
          };
          this.selectedFiles.push(uploadedFile);
          this.dataSource.data.push(uploadedFile);
          this.dataSource._updateChangeSubscription(); // Important: Refresh the table
          this.totalSize += file.size ?? 0.0;
        }
      })
    }
  }

  uploadFiles()
  {
    for (let i = 0; i < this.selectedFiles.length; i++)
    {
      const file = this.selectedFiles[i];
      if (file.file != null)
      {
        const document: Documents = {
          id: '',
          section: 'Takeoff',
          sectionId: this.data?.takeoffid,
          file: file.file,
          filename: file.name,
          createdAt: new Date().toString(),
          type: file.type,
          size: file.size
        };
        this.createDocument(document);
      }
    }
  }

  //deletDocument(sectionId)
  //{

  //  this.serivce.de(document).subscribe(
  //    (item) =>
  //    {
  //      if (item)
  //      {
  //        alert("Documents uploaded!");
  //      }
  //      else
  //      {
  //        alert("Documents not uploaded!");
  //      }
  //    },
  //    (error) =>
  //    {
  //      console.log(error);
  //    });
  //}

  createDocument(document: any)
  {

    this.serivce.createDocuments(document).subscribe(
      (item) =>
      {
        if (item)
        {
          alert("Documents uploaded!");
        }
        else
        {
          alert("Documents not uploaded!");
        }
      },
      (error) =>
      {
        console.log(error);
      });
  }

  onFileSelected(event: any)
  {
    const files: FileList = event.target.files;

    if (files)
    {
      for (let i = 0; i < files.length; i++)
      {
        const file = files[i];
        const uploadedFile: UploadedFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          file: file
        };

        this.selectedFiles.push(uploadedFile);
        this.dataSource.data.push(uploadedFile);
        this.dataSource._updateChangeSubscription(); // Important: Refresh the table
        this.totalSize += file.size;
      }
    }
    // Clear the input to allow selecting the same file again
    event.target.value = '';
  }

  removeFile(index: number)
  {
    this.totalSize -= this.dataSource.data[index].size ?? 0.0;
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
    this.selectedFiles.splice(index, 1);
  }

  formatBytes(bytes: number, decimals = 2)
  {
    if (!bytes)
    {
      return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}
