import { RouterModule, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User,UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterModule,CommonModule,HttpClientModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  deleteUser(userId: string | undefined): void {
    if (userId) {
      // Proceed to delete user
    } else {
      console.error('User ID is undefined.');
    }
  }

}
