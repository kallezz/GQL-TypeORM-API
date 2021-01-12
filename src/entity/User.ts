import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    Unique,
    OneToMany
} from "typeorm";
import {Field, ObjectType, ID} from "type-graphql";
import {Post} from "./Post";

@Entity('users')
@Unique(['username', 'email'])
@ObjectType()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    username: string;

    @Field(() => String)
    @Column()
    email: string;

    @Field(() => String)
    @Column()
    password: string;

    @Field(() => [Post])
    @OneToMany(() => Post, post => post.author, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    posts: Post[];

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;

}
