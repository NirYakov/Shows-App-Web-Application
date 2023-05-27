import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Component({
  selector: 'app-myTest',
  templateUrl: './myTest.component.html',
  styleUrls: ['./myTest.component.css']
})
export class MyTestComponent implements OnInit {
  isLoading = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  answerString = "";

  onClickTest() {
    this.http.get<{ msg: string }>(BACKEND_URL + "/test/middleware").subscribe(result => {
      this.answerString = result.msg;
      console.log(result);
    });

  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      console.log("Outt");
      return;
    }
  }

}
