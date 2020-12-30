import { GraphQLString } from 'graphql';
import Post from '../models/Post.js';
import postType from '../types/postType.js';

export const createPost = {
  type: postType,
  description: 'Create new post',
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(parent, args, req) {
    if (!req.verifiedUser) throw new Error('Unauthorized');

    const post = new Post({
      title: args.title,
      body: args.body,
      authorId: req.verifiedUser._id,
    });

    try {
      return await post.save();
    } catch (error) {
      console.log(error.message);
    }
  },
};

export const updatePost = {
  type: postType,
  description: 'Update post',
  args: {
    postId: { type: GraphQLString },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  async resolve(parent, args, req) {
    if (!req.verifiedUser) throw new Error('Unauthorized');

    const post = await Post.findOneAndUpdate(
      { _id: args.postId, authorId: req.verifiedUser._id },
      { title: args.title, body: args.body },
      { new: true, validators: true }
    );

    if (!post) throw new Error('Post does not exist.');

    return await post;
  },
};

export const deletePost = {
  type: GraphQLString,
  description: 'Delete post',
  args: {
    postId: { type: GraphQLString },
  },
  async resolve(parent, args, req) {
    if (!req.verifiedUser) throw new Error('Unauthorized');

    const post = await Post.findOneAndDelete({
      _id: args.postId,
      authorId: req.verifiedUser._id,
    });

    if (!post) throw new Error('Post does not exist.');

    return 'Post deleted.';
  },
};
