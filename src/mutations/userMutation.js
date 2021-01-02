import bcrypt from 'bcryptjs';
import { GraphQLString } from 'graphql';
import { createJWT } from '../middlewares/auth.js';
import User from '../models/User.js';

export const register = {
  type: GraphQLString,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    const salt = await bcrypt.genSalt(10);
    const securedPass = await bcrypt.hash(args.password, salt);

    try {
      const user = new User({
        name: args.name,
        email: args.email,
        password: securedPass,
      });

      await user.save();
      const token = createJWT(user);
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const login = {
  type: GraphQLString,
  args: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent, args) {
    try {
      const user = await User.findOne({ email: args.email });
      if (!user) throw new Error('Incorrect email');

      const checkPass = await bcrypt.compare(args.password, user.password);
      if (!checkPass) throw new Error('Invalid password.');

      const token = createJWT(user);
      return token;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
