import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
import { UploadService } from '../../../services/upload.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../../material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule,
    MaterialModule, MatSelectModule, CommonModule]
})
export class CreateComponent implements OnInit
{
  inputData: any = { header: 'Add User'};
  editData: any;
  selectedFiles: any;
  passwordVisible: boolean = false;

  constructor(
    private buildr: FormBuilder,
    private service: UserService,
    private dataService: DataService,
    private router: Router,
    private uploadService: UploadService
  ) { }

  ngOnInit(): void
  {
    this.inputData = this.dataService.getData();
    if (this.inputData?.id > 0)
    {
      this.setPopupData(this.inputData.id);
    }
    else
    {
      this.inputData = { header: 'Add User' };
    }
  }

  onClickRevealPassword(event: any)
  {
    event.preventDefault();
    // Prevent revealing the password when enter button is pressed.
    if (event?.pointerType)
    {
      this.passwordVisible = !this.passwordVisible;
    }
  } 

  selectFile(event: any)
  {
    this.selectedFiles = event.target.files;
  }

  cancel(): void
  {
    this.router.navigate(['users']);
  }

  myform = this.buildr.group({
    id: this.buildr.control(0),
    firstName: this.buildr.control(''),
    lastName: this.buildr.control(''),
    username: this.buildr.control(''),
    usercode: this.buildr.control(''),
    email: this.buildr.control(''),
    password: this.buildr.control(''),
    phone: this.buildr.control(''),
    roleId: this.buildr.control(''),
    profileImage: this.buildr.control(''),
    createdAt: this.buildr.control('')
  });

  setPopupData(id: any)
  {
    this.service.getUserById(id).subscribe(item =>
    {
      this.editData = item;
      this.myform.setValue({
        id: this.editData.id,
        firstName: this.editData.firstName,
        lastName: this.editData.lastName,
        username: this.editData.username,
        usercode: this.editData.usercode,
        email: this.editData.email,
        password: this.editData.password,
        phone: this.editData.phone,
        roleId: this.editData.roleId,
        createdAt: this.editData.createdAt,
        profileImage: this.editData.profileImage
      })
    });
  }

  addOrUpdate()
  {
    const id = this.myform.value.id || 0;
    this.uploadService.uploadfile(this.selectedFiles[0]);
    if (id > 0)
    {
      this.updateShippingItem(id);
    }
    else
    {
      this.saveItem();
    }
    this.cancel();
  }

  updateShippingItem(id: any)
  {
    var item = {
      id: id,
      createdAt: new Date().toISOString(),
      firstName: this.myform.value.firstName || '',
      lastName: this.myform.value.lastName || '',
      username: this.myform.value.username || '',
      usercode: this.myform.value.usercode || '',
      email: this.myform.value.email || '',
      password: this.myform.value.password || '',
      phone: this.myform.value.phone || '',
      profileImage: this.selectedFiles[0].name || '',
      roleId: this.myform.value.roleId || '',

    };
    this.service.updateUser(id, item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("User updated successfully!");
        }
        else
        {
          alert("User not updated!");
        }
      },
      (error) =>
      {
        console.error(error);
      }
    );
  }

  saveItem(): any
  {
    console.log(this.myform.value);
    var item = {
      id: 0,
      createdAt: new Date().toISOString(),
      firstName: this.myform.value.firstName || '',
      lastName: this.myform.value.lastName || '',
      username: this.myform.value.username || '',
      usercode: this.myform.value.usercode || '',
      email: this.myform.value.email || '',
      password: this.myform.value.password || '',
      phone: this.myform.value.phone || '',
      profileImage: this.selectedFiles[0].name || '',
      roleId: this.myform.value.roleId || '',
    };
    this.service.createUser(item).subscribe(
      (result) =>
      {
        if (result)
        {
          alert("User created successfully!");
        }
        else
        {
          alert("User not created!");
        }
      },
      (error) =>
      {
        console.error(error);
        alert(error);
      }
    );
  }

}
