import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "testimonials" })
export class Testimonial {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 150 })
  name!: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  role?: string | null;

  @Column({ type: "varchar", length: 150, nullable: true })
  company?: string | null;

  @Column({ type: "text" })
  message!: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  avatarUrl?: string | null;

  @Column({ type: "int", nullable: true })
  rating?: number | null;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @Column({ type: "int", default: 0 })
  sortOrder!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
