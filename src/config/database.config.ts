import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const postgreConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mattz',
  password: 'doraemon08',
  database: 'codeid_batch18',
  entities: [__dirname + '/../entities/*{.ts,.js}'],
  synchronize: false,
};
