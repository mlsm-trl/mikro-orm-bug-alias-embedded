import { Embeddable, Property } from "@mikro-orm/core";
import PointType from "../database/postgresql/PointType";
import Point from "../database/postgresql/Point";

@Embeddable()
class Address {
  @Property()
  postalCode!: string;

  @Property({ type: PointType, nullable: true })
  geolocation?: Point;
}

export default Address;
