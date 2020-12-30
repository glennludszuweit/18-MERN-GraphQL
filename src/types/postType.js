import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import userType from './userType.js';
import User from '../models/User.js';
import commentType from './commentType.js';
import Comment from '../models/Comment.js';

const postType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post type',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: {
      type: userType,
      async resolve(parent) {
        return await User.findById(parent.authorId);
      },
    },
    comments: {
      type: GraphQLList(commentType),
      async resolve() {
        return await Comment.find({ postId: parent.id });
      },
    },
  }),
});

export default postType;
