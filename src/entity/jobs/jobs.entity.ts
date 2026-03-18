import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "jobs" })
export class Job {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 200, nullable: true, default: "Unknown" })
  position?: string | null;

  @Column({ type: "varchar", length: 150, nullable: true })
  department?: string | null;

  @Column({ type: "varchar", length: 150, nullable: true })
  location?: string | null;

  @Column({
    type: "enum",
    enum: ["fullTime", "partTime", "seasonal", "contract"],
    default: "fullTime",
  })
  employmentType!: "fullTime" | "partTime" | "seasonal" | "contract";

  @Column({ type: "varchar", length: 50, nullable: true })
  experienceLevel?: string | null;

  @Column({ type: "text", nullable: true })
  description?: string | null;

  @Column({ type: "text", nullable: true })
  requirements?: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  packageOffered?: string | null;

  @Column({ type: "varchar", length: 200, nullable: true })
  recruitedPerson?: string | null;

  @Column({ type: "timestamp", nullable: true })
  recruitedAt?: Date | null;

  @Column({ type: "varchar", length: 200, nullable: true })
  recruitedFrom?: string | null;

  @Column({ type: "varchar", length: 200, nullable: true })
  recruitedThrough?: string | null;

  @Column({ type: "text", nullable: true })
  recruitmentNotes?: string | null;

  @Column({ type: "varchar", length: 500, nullable: true })
  imageUrl?: string | null;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "timestamp", nullable: true })
  postedAt?: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
