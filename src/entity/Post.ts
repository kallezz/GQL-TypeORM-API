import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn, RelationId,
    UpdateDateColumn
} from "typeorm";
import {Field, Int, ObjectType} from "type-graphql";
import {User} from "./User";

@Entity('posts')
@ObjectType()
export class Post extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    body: string;

    @Field(() => User)
    @ManyToOne(() => User, user => user.posts)
    author: User;
    @RelationId((post: Post) => post.author)
    authorId: number;

    @Field(() => Date)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => Date)
    @UpdateDateColumn()
    updatedAt: Date;

}