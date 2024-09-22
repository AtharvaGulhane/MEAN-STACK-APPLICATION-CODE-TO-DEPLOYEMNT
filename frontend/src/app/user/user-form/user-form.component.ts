import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { User, UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [RouterModule, FormsModule, HttpClientModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  user: User = { name: '', email: '', age: 0 };
  isEditMode = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditMode = true;
      this.userService
        .getUserById(userId)
        .subscribe((data) => (this.user = data));
    }
  }

  saveUser() {
    if (this.isEditMode) {
      this.userService
        .updateUser(this.user._id!, this.user)
        .subscribe(() => this.router.navigate(['/users']));
    } else {
      this.userService
        .createUser(this.user)
        .subscribe(() => this.router.navigate(['/users']));
    }
  }
}
