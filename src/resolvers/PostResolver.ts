import {Resolver, Query, Mutation, Arg} from "type-graphql";
import {Post} from "../entity/Post";
import { PostInput } from "../inputs/PostInput";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    users() {
        return Post.find()
    }

    @Mutation(() => Post)
    async createPost(@Arg("data") data: PostInput) {
        const post = Post.create(data);
        await post.save();
        return post;
    }
}