import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Seo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  keywords: string;
}
