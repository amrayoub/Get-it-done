import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';

const mockTaskRepository = () => ({
  getTasks: jest.fn()
});

describe('TaskService', () => {
  let tasksService;
  let taskRepository; // we need to mock the repository, we don't wanna test on real database


  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ]
    }).compile();

    tasksService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });

  describe('getTasks', () => {
    it('gets all tasks from repository', () => {
      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      // call taskService.getTasks
      tasksService.getTasks()

      // expect tasksrepository.getTasks TO HAVE BEEN CALLED
    });
  });
})