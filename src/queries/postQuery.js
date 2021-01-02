import { GraphQLID, GraphQLList } from 'graphql';
import Post from '../models/Post.js';
import postType from '../types/postType.js';

export const posts = {
  type: GraphQLList(postType),
  description: 'Get all posts',
  async resolve() {
    try {
      return await Post.find();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const post = {
  type: postType,
  description: 'Get one post',
  args: { postId: { type: GraphQLID } },
  async resolve(parent, args) {
    try {
      return await Post.findById(args.postId);
    } catch (error) {
      throw new Error('Post not found');
    }
  },
};
