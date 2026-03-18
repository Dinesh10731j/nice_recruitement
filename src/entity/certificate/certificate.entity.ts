import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "certificates" })
export class Certificate {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 150 })
  title!: string;

  @Column({ type: "varchar", length: 150, nullable: true })
  issuer?: string | null;

  @Column({ type: "timestamp", nullable: true })
  issuedAt?: Date | null;

  @Column({ type: "timestamp", nullable: true })
  expiresAt?: Date | null;

  @Column({ type: "varchar", length: 500, nullable: true })
  certificateUrl?: string | null;

  @Column({ type: "boolean", default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
