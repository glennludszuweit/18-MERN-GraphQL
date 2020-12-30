import { GraphQLID, GraphQLList } from 'graphql';
import Post from '../models/Post.js';
import postType from '../types/postType.js';

export const posts = {
  type: GraphQLList(postType),
  description: 'Get all posts',
  async resolve() {
    return await Post.find();
  },
};

export const post = {
  type: postType,
  description: 'Get one post',
  args: { postId: { type: GraphQLID } },
  async resolve(parent, args) {
    return await Post.findById(args.postId);
  },
};
