import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  allTasks: any[] = [];

  constructor(private _httpService: HttpService){
    
  }

  ngOnInit(): void {
  
  }

  getTasks(): void {
    console.log("We are going to fetch the tasks list!");
    this.allTasks = this._httpService.task;
    console.log("Tasks List component ", this.allTasks);
  }

}
