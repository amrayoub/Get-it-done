import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController')
  constructor(private tasksService: TasksService) {}

//   @Get()
//   getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[] {
//     if(Object.keys(filterDto).length) {
//       return this.tasksService.getTasksWithFilters(filterDto)
//     } else  {
//       return this.tasksService.getAllTasks();
//     }
//   }

  @Get()
  getTasks(
    @Query(ValidationPipe) filterDto: GetTaskFilterDto,
    @getUser() user:User) {
      this.logger.verbose(`User "${user.username}" getting all tasks. Filters: ${JSON.stringify(filterDto)}`)
    return this.tasksService.getTasks(filterDto,user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @getUser() user:User,
     ): Promise<Task> {
    this.logger.verbose(`User ${user.username} is getting a task id ${id}`)
    return this.tasksService.getTaskById(id,user);
   }

   @Delete('/:id')
   deleteTask(
     @Param('id',ParseIntPipe) id: number,
     @getUser() user:User
     ):Promise<void>{
      this.logger.verbose(`User ${user.username} is deleting a task id ${id}`)

     return this.tasksService.deleteTask(id,user);
   }

   
  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body() CreateTaskDto: CreateTaskDto,
    @getUser() user: User,): Promise<Task>{
      this.logger.verbose(`User ${user.username}" creating new tasks. Data ${JSON.stringify(CreateTaskDto)}`);
   return this.tasksService.createTask(CreateTaskDto, user);

  }



@Patch('/:id/status')
updateTaskStatus(
  @Param('id',ParseIntPipe) id: number,
  @Body('status',  TaskStatusValidationPipe) status: TaskStatus,
  @getUser() user: User): Promise<Task> {
    this.logger.verbose(`User ${user.username} is updating a task id ${id} with status${status}`)
    return this.tasksService.updateTaskStatus(id,status,user)
  }
  
}