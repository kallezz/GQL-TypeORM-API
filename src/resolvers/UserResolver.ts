import {Resolver, Query, Mutation, Arg} from "type-graphql";
import {User} from "../entity/User";
import {UserInput} from "../inputs/UserInput";

@Resolver()
export class UserResolver {
    @Query(() => [User])
    users() {
        return User.find()
    }

    @Mutation(() => User)
    async registerUser(@Arg("data") data: UserInput) {
        const user = User.create(data);
        await user.save();
        return user;
    }
}
