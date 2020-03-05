import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus} from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTaskFilterDto) :Task[]{
  //   const {status, search} = filterDto;
    
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter(task => task.status = status)
  //   }
  //   if(search) {
  //     tasks = tasks.filter(task =>
  //        task.title.includes(search) || task.description.includes(search),
  //     )
  //   }
  //   return tasks
  // }


    async getTasks(filterDto:GetTaskFilterDto, user:User):Promise<Task[]>{
      return await this.taskRepository.getTasks(filterDto,user);
      
    }

    async getTaskById(
      id: number,
      user:User,
      ): Promise<Task> {

      const found = await this.taskRepository.findOne({where: { id, userId: user.id} });


      if(!found) {
        throw new NotFoundException(`Task with ${id} not found`);
      }
      return found;
    }

  // getTaskById(id:string): Task {
  //   const found = this.tasks.find(task => task.id = id);
  //   if(!found) {
  //     throw new NotFoundException(`Task with ${id} not found`)
  //   }
  //   return found;
  // }

 async createTask(
   createTaskDto: CreateTaskDto,
   user: User):Promise<Task> {

    return this.taskRepository.createTask(createTaskDto,user);
    }

  // createTask(createTaskDto: CreateTaskDto): Task {
  // const {title, description} = createTaskDto; // destructing helps with less arguments  

  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN
  //   };

  //   this.tasks.push(task);
  //   return task;

  // }
    async deleteTask(
      id: number,
      user: User): Promise<void> {
      
       const result =  await this.taskRepository.delete({ id , userId: user.id });

       if (result.affected === 0){
         throw new NotFoundException(`task with id ${id} not found`);
       }
        
        
    }
  // deleteTask(id: string){
  //   const found = this.getTaskById(id);

  //   return this.tasks.filter(task => task.id !== found.id);
  // }

      async updateTaskStatus(
         id: number,
         status: TaskStatus,
         user:User
         ):Promise<Task>{

        const task = await this.getTaskById(id,user);
        task.status = status;
        await task.save()
        return task;

      }
}
