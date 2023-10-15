import { defineConfig } from "@mikro-orm/postgresql";

export default defineConfig({
  entities: ["entities/*.{ts,js}"],
  dbName: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  discovery: {
    warnWhenNoEntities: false,
  },
  migrations: {
    tableName: `${process.env.DB_DATABASE}_migrations`,
    path: 'migrations/',
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    safe: true,
    emit: 'ts',
    snapshotName: '.snapshot',
  },
  tsNode: true,
  debug: true,
  cache: { pretty: true },
});
