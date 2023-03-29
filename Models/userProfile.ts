import {
	BaseEntity,
	Column,
	Entity,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import "reflect-metadata";
import { UserEntites } from "./UserModel";

@Entity("profileEntity")
export class profileEntity extends BaseEntity {
	@PrimaryGeneratedColumn({})
	id: string | number;

	@Column()
	gender: string;

	@Column()
	country: string;

	@Column()
	phoneNumber: number;

	@OneToOne(() => UserEntites, (user) => user.profile)
	user: UserEntites;
}
