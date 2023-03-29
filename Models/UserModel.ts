import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BaseEntity,
	OneToOne,
	JoinColumn,
	OneToMany,
} from "typeorm";
import "reflect-metadata";
import { profileEntity } from "./userProfile";
import { BookEntity } from "./BookShop";

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

	@OneToMany(() => BookEntity, (user) => user.author)
	books: BookEntity;
}
