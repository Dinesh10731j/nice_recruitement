import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "user_activity" })
export class UserActivity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  userId?: string | null;

  @Column({ type: "varchar", length: 10 })
  method!: string;

  @Column({ type: "varchar", length: 500 })
  path!: string;

  @Column({ type: "int", nullable: true })
  statusCode?: number | null;

  @Column({ type: "varchar", length: 45, nullable: true })
  ip?: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  userAgent?: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  referer?: string | null;

  @Column({ type: "int", nullable: true })
  durationMs?: number | null;

  @CreateDateColumn()
  createdAt!: Date;
}
