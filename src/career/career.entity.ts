import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Company {
  @PrimaryColumn()
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
  @PrimaryColumn()
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
  @PrimaryColumn()
  id: number;
  
  @Column()
  content: string;

  @ManyToOne(() => CompanyProject, (project) => project.tasks)
  project: CompanyProject;
}
