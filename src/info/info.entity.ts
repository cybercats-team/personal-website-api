import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

export enum ContactType {
  kUnspecified = "",
  kEmail       = "email",
  kPhone       = "phone",
  kLinkedIn    = "linkedin",
  kUpWork      = "upwork",
  kGitHub      = "github",
  kTelegram    = "telegram",
  kViber       = "viber",
  kGravatar    = "gravatar",
  kGoogleMeet  = "calendly"
}

@Entity()
export class Info {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  extra: string;

  @OneToMany(() => InfoContact, (contact) => contact.info)
  contacts: InfoContact[];
}

@Entity()
export class InfoContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type:    "simple-enum",
    enum:    ContactType,
    default: ContactType.kUnspecified,
  })
  type: ContactType;

  @Column()
  account: string;

  @Column()
  url: string;

  @Column()
  internalId: string;
  
  @ManyToOne(() => Info, (info) => info.contacts)
  info: Info;
}
