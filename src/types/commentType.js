import { GraphQLID, GraphQLObjectType, GraphQLString } from 'graphql';
import Post from '../models/Post.js';
import User from '../models/User.js';
import postType from './postType.js';
import userType from './userType.js';

const commentType = new GraphQLObjectType({
  name: 'Comment',
  description: 'Comment type',
  fields: () => ({
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    author: {
      type: userType,
      async resolve(parent) {
        return await User.findById(parent.authorId);
      },
    },
    post: {
      type: postType,
      async resolve(parent) {
        return await Post.findById(parent.postId);
      },
    },
  }),
});

export default commentType;
