import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  task: any[] = [];

  constructor(private _http: HttpClient) { 
    this.fetchTasks();
    //this.fetchTasksByName("Ronaldo");
  }

  fetchTasks(): void{
    this._http.get( "http://localhost:8080/tasks/" )
      .subscribe( (data:any) => {
        this.task = data.task;
        console.log( "All TASKS: ", this.task );
      });
  }

  /*fetchTasksByName(title : String): void{
    this._http.get( "http://localhost:8080/tasks/"+ title )
      .subscribe( (data:any) => {
        this.task = data;
        console.log("Find by Name", this.task );
      });
  }*/

}
