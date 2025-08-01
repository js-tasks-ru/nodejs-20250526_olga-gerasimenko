import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity('tasks')
  export class Task {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'text', nullable: false})
    description: string;

    @Column({ type: 'boolean', default: false, nullable: true })
    isCompleted: boolean;
  }
