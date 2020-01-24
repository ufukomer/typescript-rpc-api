import * as mongoose from 'mongoose';
import Post from './models/post';

const MONGO_URI: string = process.env.MONGO_URI || 'mongodb://noxart:password@typescript-rpc-api_mongo_1:27017/noxart';

const singleton = Symbol('Mongo');
const singletonEnforcer = Symbol('MongoEnforcer');

mongoose.connection.on('error', () => {
  console.log('MongoDB connection error:');
});

mongoose.connection.once('open', () => {
  console.log("Connected to the database!");
});

mongoose.connection.on('disconnected', () => {
  console.log('Server terminated');
  process.exit(0);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection is disconnected due to application termination',
    );
  });
});

class Mongo {
  Post: mongoose.Model<any>;

  constructor(enforcer: Symbol) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }

    this.Post = Post;
  }

  async connect() {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (e) {
      console.log('Connection error:', e);
    }
  }

  async close() {
    try {
      await (mongoose as any).close();
    } catch (e) {
      console.log('Cannot close db:', e);
    }
  }

  static get instance(): Mongo {
    if (!this[singleton]) {
      this[singleton] = new Mongo(singletonEnforcer);
    }

    return this[singleton];
  }
}

const mongo: Mongo = Mongo.instance;

export { mongo };
