import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find(task =>  task.id === id);
    if (!task) throw new NotFoundException(`task with id ${id} not found`);
    return task;
  }

  createTask(task: Task): Task {
    const newTask = {
      id: "" + Date.now(),
      title: task.title,
      description: task.description,
      status: task.status
    };
    this.tasks.push(newTask);
    return newTask;
  }

  updateTask(id: string, update: Task): Task {
     const task = this.getTaskById(id);
     task.title = update.title;
     task.description = update.description;
     task.status = update.status;
     return task;
  }

  deleteTask(id: string): Task {
    const deletedTask = this.getTaskById(id);
    this.tasks = this.tasks.filter(task => task.id != deletedTask.id);
    return deletedTask;
  }
}
