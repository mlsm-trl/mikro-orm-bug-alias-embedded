/* eslint-disable unicorn/no-unsafe-regex */
import { Type } from '@mikro-orm/core'
import Point from './Point'

class PointType extends Type<Point | undefined, string | undefined> {
  convertToDatabaseValue(value: Point | undefined): string | undefined {
    if (!value) {
      return value
    }

    return `point(${value.longitude} ${value.latitude})`
  }

  convertToJSValue(value: string | undefined): Point | undefined {
    const m = value?.match(/point\((-?\d+(\.\d+)?) (-?\d+(\.\d+)?)\)/i)

    if (!m) {
      return undefined
    }

    return new Point(+m[3], +m[1])
  }

  convertToJSValueSQL(key: string) {
    return `ST_AsText(${key})`
  }

  convertToDatabaseValueSQL(key: string) {
    return `ST_GeomFromText(${key}, 4326)`
  }

  getColumnType(): string {
    return 'geometry'
  }
}

export default PointType
