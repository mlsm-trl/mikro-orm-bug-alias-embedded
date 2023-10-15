# Mikro-ORM bug reproduction: prefixed Embedded having alias when shouldn't

When querying an entity that has prefixed Embedded, `TableNotFoundException` is thrown:

```sql
TableNotFoundException: select "u0".*, "u0"."addresses"."geolocation" from "user" as "u0" where "u0"."id" = 1 limit 1 - missing FROM-clause entry for table "addresses"
    at PostgreSqlExceptionConverter.convertException (...\node_modules\@mikro-orm\postgresql\PostgreSqlExceptionConverter.js:38:24)
```

`"u0"."addresses"."geolocation"` should be `"u0"."addresses"` as it was before commit [24c4ece](https://github.com/mikro-orm/mikro-orm/commit/24c4ece2775c0dbfc4e53ffbc3f33ec5524e5760) was made after issue [#4711](https://github.com/mikro-orm/mikro-orm/issues/4711).

It seems that, in this use case, the `"address"."geolocation"` property is marked with `hasConvertToDatabaseValueSQL` and `hasConvertToJSValueSQL` in props mapping, making it pass [this filter](https://github.com/mikro-orm/mikro-orm/blob/66278ea466df5434dbee36a8b45225998b888a94/packages/knex/src/AbstractSqlDriver.ts#L1114C6-L1114C6) and to be added to query builder's [select fields](https://github.com/mikro-orm/mikro-orm/blob/66278ea466df5434dbee36a8b45225998b888a94/packages/knex/src/AbstractSqlDriver.ts#L85), that when the property is being converted to knex in [`prepareFields`](https://github.com/mikro-orm/mikro-orm/blob/66278ea466df5434dbee36a8b45225998b888a94/packages/knex/src/query/QueryBuilder.ts#L883), the [alias is added](https://github.com/mikro-orm/mikro-orm/blob/66278ea466df5434dbee36a8b45225998b888a94/packages/knex/src/query/QueryBuilder.ts#L906).

With the alias prefixed to `fieldName` now, the `mapper` from `QueryBuilderHelper` seems to be unable to find the property ([line 79](https://github.com/mikro-orm/mikro-orm/blob/66278ea466df5434dbee36a8b45225998b888a94/packages/knex/src/query/QueryBuilderHelper.ts#L79)) to apply the correct processing, and returns it as is.



### Context

**Mikro-ORM:** v5.8.8

**Database:** PostgreSQL 14

### Steps

- Install dependencies with `yarn install`
- Create `.env` file based on `.env.example`
- Run `yarn start`

