import { GraphQLID, GraphQLList } from 'graphql';
import User from '../models/User.js';
import userType from '../types/userType.js';

export const users = {
  type: GraphQLList(userType),
  description: 'Get all users',
  async resolve() {
    try {
      return await User.find();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const user = {
  type: userType,
  description: 'Get one user',
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent, args) {
    try {
      return await User.findById(args.id);
    } catch (error) {
      console.log(error.message);
      throw new Error('User not found');
    }
  },
};
