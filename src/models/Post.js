import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    image: String,
    authorId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Post', postSchema);
