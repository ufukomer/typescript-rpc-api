import * as mongoose from 'mongoose';

export interface IPostModel extends mongoose.Document {
  _id: string;
  title: string,
  body: string,
  date: number,
  hidden: boolean,
  likes: number
}

const PostModel = mongoose.model<IPostModel>(
  'Post',
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: 'Enter a title',
      },
      body: String,
      date: {
        type: Date,
        default: Date.now,
      },
      hidden: {
        type: Boolean,
        default: false,
      },
      likes: {
        type: Number,
        default: 0,
      },
    },
  ),
);

export default PostModel;
