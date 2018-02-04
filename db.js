import ShareDB from 'sharedb';
import ShareDBRedis from 'sharedb-redis-pubsub';
import ShareDBMongo from 'sharedb-mongo';

const share = new ShareDB({
  db: new ShareDBMongo("mongodb://localhost:27017/codeeditor"),
  pubsub: new ShareDBRedis("redis://localhost:6379/3")
});

export default share;
