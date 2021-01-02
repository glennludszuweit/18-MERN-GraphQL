import { GraphQLString } from 'graphql';
import Comment from '../models/Comment.js';
import commentType from '../types/commentType.js';

export const addComment = {
  type: commentType,
  description: 'Add comment to post',
  args: {
    comment: { type: GraphQLString },
    postId: { type: GraphQLString },
  },
  async resolve(parent, args, req) {
    if (!req.verifiedUser) throw new Error('Unauthorized');

    try {
      const comment = new Comment({
        comment: args.comment,
        postId: args.postId,
        authorId: req.verifiedUser._id,
      });

      return await comment.save();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export const updateComment = {
  type: commentType,
  description: 'Update comment',
  args: {
    commentId: { type: GraphQLString },
    comment: { type: GraphQLString },
  },
  async resolve(parent, args, req) {
    if (!req.verifiedUser) throw new Error('Unauthorized');

    try {
      const comment = await Comment.findOneAndUpdate(
        { _id: args.commentId, authorId: req.verifiedUser._id },
        { comment: args.comment },
        { new: true, validators: true }
      );
      return comment;
    } catch (error) {
      console.log(error.message);
      throw new Error('Comment not found.');
    }
  },
};

export const deleteComment = {
  type: GraphQLString,
  description: 'Delete comment',
  args: {
    commentId: { type: GraphQLString },
  },
  async resolve(parent, args, req) {
    if (!req.verifiedUser) throw new Error('Unauthorized');

    try {
      await Comment.findOneAndDelete({
        _id: args.commentId,
        authorId: req.verifiedUser._id,
      });
    } catch (error) {
      console.log(error.message);
      throw new Error('Comment not found.');
    }

    return 'Comment deleted';
  },
};
