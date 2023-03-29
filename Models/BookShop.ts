import "reflect-metadata";
import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
} from "typeorm";
import { UserEntites } from "./UserModel";

@Entity("BookEntity")
export class BookEntity extends BaseEntity {
	@PrimaryGeneratedColumn({})
	id: string | number;

	@Column()
	title: string;

	@Column()
	description: string;

	@ManyToOne(() => UserEntites, (user) => user.books)
	author: UserEntites;
}
