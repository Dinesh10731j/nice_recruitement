import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "advertisements" })
export class Advertise {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 200 })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  imageUrl?: string | null;

  @Column({ type: "varchar", length: 500, nullable: true })
  linkUrl?: string | null;

  @Column({ type: "varchar", length: 150, nullable: true })
  companyName?: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  contactEmail?: string | null;

  @Column({ type: "varchar", length: 30, nullable: true })
  contactPhone?: string | null;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "timestamp", nullable: true })
  startDate?: Date | null;

  @Column({ type: "timestamp", nullable: true })
  endDate?: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
