import { MikroORM } from "@mikro-orm/core";
import config from "./mikro-orm.config";
import User from "./entities/User";
import { RequestContext } from "@mikro-orm/core";

async function init() {
  const orm = await MikroORM.init(config);

  const migrator = orm.getMigrator();
  await migrator.up();

  RequestContext.createAsync(orm.em, async () => {
    const userRepository = orm.em.getRepository(User);

    const user = await userRepository.findOne({
      id: 1,
    });

    console.log(user);

    process.exit();
  });
}

init();
