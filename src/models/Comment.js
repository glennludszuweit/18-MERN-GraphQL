import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    // _id: mongoose.Schema.Types.ObjectId, <= this is created automitaclly by mongoose
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
