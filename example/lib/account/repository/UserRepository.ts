import { Repository, Autowired } from '../../../../lib';

@Repository
export default class UserRepository {

  /*
  @Autowired('mysql.primary')
  private mysql: MysqlRepository;

  @Autowired('mongo.primary')
  private mongo;
   */

  constructor () {
    console.log('new userRepository');
  }

  public hello () {
    /*
    let client = this.mysql.getClient();
    console.log(client.threadId);
    let a = await client.query("use tp5");
    let res = await client.query("select * from User limit 10");
    console.log(res);
    client.query("use tp5", function(err, ret) {});
    client.query("select * from User limit 10", function(err, res) {
      console.log(res);
    });
    */
    return "user repository";
  }

  public helloMongo () {
    /*
    let dbName = 'test';
    let client = this.mongo.getClient();
    const db = client.db(dbName);
    const col = db.collection('user');
    col.find({}).toArray(function(err, items) {
      console.log(items);
      console.log('item', items.length);
    });
     */
    return 'helloMongo';
  }

}

