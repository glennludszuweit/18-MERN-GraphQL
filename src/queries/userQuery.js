import { GraphQLID, GraphQLList } from 'graphql';
import User from '../models/User.js';
import userType from '../types/userType.js';

export const users = {
  type: GraphQLList(userType),
  description: 'Get all users',
  async resolve() {
    return await User.find();
  },
};

export const user = {
  type: userType,
  description: 'Get one user',
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent, args) {
    return await User.findById(args.id);
  },
};
