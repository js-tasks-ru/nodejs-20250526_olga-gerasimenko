import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
  ): Task[] {
    if (status && !Object.values(TaskStatus).includes(status)) {
      throw new BadRequestException(`Invalid status: ${status}. Allowed statuses are: ${Object.values(TaskStatus).join(', ')}`);
    }

    if (page && page < 1) {
      throw new BadRequestException(`Invalid page: ${page}. Allowed only positive number`);
    }

    if (limit && limit < 1) {
      throw new BadRequestException(`Invalid limit: ${limit}. Allowed only positive number`);
    }

    let tasks = this.tasks;

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }

    if (page !== undefined || limit !== undefined) {
      const startIndex = (page ? (page - 1) * (limit ?? tasks.length) : 0);
      const endIndex = limit ? startIndex + limit : tasks.length;

      if (startIndex >= tasks.length) {
        return [];
      }

      tasks = tasks.slice(startIndex, endIndex);
    }

    if (tasks.length === 0) throw new NotFoundException(`tasks with status ${status} not found`);
    return tasks;
  }
}
