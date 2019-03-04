export interface IDao {
  connect();
  disconnect();
  getClient();
}

export interface MongoRepository extends IDao {}

export interface MysqlRepository extends IDao {}

export interface RedisRepository extends IDao {}
