import { Type } from 'jbean'
import { Entity } from '../../../../lib'
import {Required, Min, Max, Size} from '../../../../lib'

@Entity
export default class User {

  @Type('string')
  @Required("uid是必填的参数")
  public uid = undefined

  @Required
  @Size(20, 30, 'name的长度应该位于20-31之间')
  public name = undefined

  @Type('number')
  @Required("age is required")
  @Min(18)
  @Max(100)
  public age = undefined

}