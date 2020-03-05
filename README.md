# Get-it-done
Get it done is a task management web application backend API  built with NestJS + TypeORM  and Angular for the Frontend



### User shape:
```  
@PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Task, task => task.user, {eager: true})
    tasks: Task[];
}
```
### Task shape entity:
```
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title:string
    
    @Column()
    description: string;

    @Column()
    status: TaskStatus

    @ManyToOne(type => User, user => user.tasks, { eager: false })
    user:User
    
    @Column()
    userId: number
```

