import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Seo {
  @PrimaryColumn()
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
