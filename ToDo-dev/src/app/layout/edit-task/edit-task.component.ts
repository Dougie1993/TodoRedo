import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  listId: string;
  taskId: string;
  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params.listId;
        this.taskId = params.taskId;
        console.log(params.listId);
      }
    )
  }

  updateTask(title: string) {
    this.taskService.updateTask(this.listId, this.taskId, title).subscribe(() => {
      console.log('We updating task');
      this.router.navigate(['/lists', this.listId]);
    })
  }


}
