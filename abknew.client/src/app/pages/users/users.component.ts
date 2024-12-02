import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MaterialModule } from '../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatTableModule,
    MaterialModule, MatSelectModule]
})
export class UsersComponent {
  users!: User[];
  dataSource: any;
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'created_at', 'usercode', 'action'];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private service: UserService,
    private dataService: DataService,
    private router: Router
  )
  {
    this.getUsers();
  }

  getUsers()
  {
    this.service.getUsers().subscribe(
      (result) =>
      {
        this.users = result;
        this.dataSource = new MatTableDataSource<User>(this.users);
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
    this.dataService.setData({ id, header });
    this.router.navigate(['users/create']);
  }

  editItem(id: any)
  {
    this.openPopup(id, 'Edit User');
  }

  addUsers()
  {
    this.openPopup(0, 'Add User');
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
      this.service.deleteUser(val).subscribe(
        (result) =>
        {
          if (result)
          {
            alert("User deleted successfully!");
          }
          else
          {
            alert("User not deleted!");
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
