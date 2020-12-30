import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Comment', commentSchema);
