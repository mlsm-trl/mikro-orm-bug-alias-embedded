import { Entity, PrimaryKey, Embedded } from "@mikro-orm/core";
import Address from "./Address";

@Entity()
class User {
  @PrimaryKey()
  id!: number;

  @Embedded(() => Address, { array: true })
  addresses: Address[] = []
}

export default User