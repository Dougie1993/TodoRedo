import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { List } from 'src/app/interface/list.interface';
import { Task } from 'src/app/interface/task.interface';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists : List[];
  tasks : Task[];
  list : List;

  selectedListId: string;
  constructor(private taskservice: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.listId) {
        console.log(params);
        this.selectedListId = params.listId;
        this.taskservice.getTasks(params.listId).subscribe((tasks: Task[]) => {
          this.tasks = tasks;
          console.log(tasks);
        })
      } else {
        this.tasks = undefined;
      }
      
    })
    this.taskservice.getLists().subscribe((lists: List[]) => {
      console.log(lists);
      this.lists = lists;
    })
  }

  onTaskClick(task: Task) {
    task.completed = !task.completed;
    this.taskservice.complete(task).subscribe(() => {
      console.log('completed Succesfully ', task);
    });
  }

  onDeleteList() {
    this.taskservice.deleteList(this.selectedListId).subscribe((deletedDoc: HttpResponse<any>) => {
      console.log('The following list has been succesfully deleted ' + deletedDoc);
      this.router.navigate(['/lists' ]);
    })
  }

  onTaskDelete(id: string) {
    this.taskservice.deleteTask(this.selectedListId, id).subscribe((deletedDoc: HttpResponse<any>) => {
      console.log('The following list has been succesfully deleted ' + deletedDoc);
      this.tasks = this.tasks.filter(val => val._id !== id); // get updated task list
    })
  }

  

}
