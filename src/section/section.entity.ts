import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Section {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => SectionPoint, (point) => point.section)
  points: SectionPoint[];
}

@Entity()
export class SectionPoint {
  @PrimaryColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Section, (section) => section.points)
  section: Section;
}
