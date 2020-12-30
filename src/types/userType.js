import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import commentType from './commentType.js';
import postType from './postType.js';

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'User type',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    posts: {
      type: GraphQLList(postType),
      async resolve(parent) {
        return await Post.find({ authorId: parent.id });
      },
    },
    comments: {
      type: GraphQLList(commentType),
      async resolve(parent) {
        return await Comment.find({ authorId: parent.id });
      },
    },
  }),
});

export default userType;
