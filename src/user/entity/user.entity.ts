import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number; // integer number, increments on update

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date; // timestamp of creation

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date; // timestamp of last update

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    const createdNumber = Number(createdAt.getMilliseconds());
    const updatedNumber = Number(updatedAt.getMilliseconds());
    return {
      id,
      login,
      version,
      createdAt: createdNumber,
      updatedAt: updatedNumber,
    };
  }
}
