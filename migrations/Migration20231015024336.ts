import { Migration } from '@mikro-orm/migrations';

export class Migration20231015024336 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "addresses" jsonb not null);');
    
    this.addSql('insert into "user" ("id", "addresses") values (1, \'[{"postalCode": "10000000"}]\'::jsonb);');
  }

}
