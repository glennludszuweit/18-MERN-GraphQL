import { GraphQLID, GraphQLList } from 'graphql';
import Comment from '../models/Comment.js';
import commentType from '../types/commentType.js';

export const comments = {
  type: GraphQLList(commentType),
  description: 'get my comments',
  async resolve(parent, args, req) {
    try {
      return await Comment.find({ authorId: req.verifiedUser._id });
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const comment = {
  type: commentType,
  decription: 'Get one comment',
  args: { commentId: { type: GraphQLID } },
  async resolve(parent, args) {
    try {
      return await Comment.findById(args.commentId);
    } catch (error) {
      throw new Error('Comment not found');
    }
  },
};
