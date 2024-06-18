import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']  // Corrected property name
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { username: "", password: "" };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  logInUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (res: any) => {  // Explicitly typing `res` as `any`
        this.dialogRef.close();
        this.snackBar.open(`Login success, Welcome ${res.user.username}`, "OK", {
          duration: 2000
        });
        const user = {
          id: res.user._id,
          username: res.user.username,
          birthday: res.user.birthday,
          email: res.user.email,
          token: res.token
        };
        localStorage.setItem("user", JSON.stringify(user));
      },
      (err: any) => {  // Explicitly typing `err` as `any`
        this.snackBar.open("Login failed", "OK", {
          duration: 2000
        });
      }
    );
  }
}
