import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	OneToOne,
	JoinColumn,
} from "typeorm";
import "reflect-metadata";
import { profileEntity } from "./userProfile";

@Entity("UserEntites")
export class UserEntites extends BaseEntity {
	@PrimaryGeneratedColumn({})
	id: string | number;

	@Column()
	userName: string;

	@Column()
	email: string;

	@OneToOne(() => profileEntity, (profile) => profile.user)
	@JoinColumn()
	profile: profileEntity;
}
