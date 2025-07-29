import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { ObjectId } from "mongoose";
import { ObjectIDPipe } from "../objectid/objectid.pipe";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() body: CreateTaskDto) {
    return this.tasksService.create(body);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(":id")
  findOne(@Param('id', ObjectIDPipe) id: ObjectId) {
    return this.tasksService.findOne(id);
  }

  @Patch(":id")
  update(@Param('id', ObjectIDPipe) id: ObjectId, @Body() body: UpdateTaskDto) {
    return this.tasksService.update(id, body);
  }

  @Delete(":id")
  remove(@Param('id', ObjectIDPipe) id: ObjectId) {
    return this.tasksService.remove(id);
  }
}
