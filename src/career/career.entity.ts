import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  timeline: string;

  @OneToMany(() => CompanyProject, (project) => project.company)
  projects: CompanyProject[];
}

@Entity()
export class CompanyProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  summary: string;

  @Column()
  role: string;

  @Column()
  stack: string;

  @ManyToOne(() => Company, (company) => company.projects)
  company: Company;

  @OneToMany(() => ProjectTask, (task) => task.project)
  tasks: ProjectTask[];
}

@Entity()
export class ProjectTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => CompanyProject, (project) => project.tasks)
  project: CompanyProject;
}
