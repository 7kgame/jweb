import { Type } from 'jbean'
import { Entity, Between, Regex, Required, Min, Max, Size, ValidationScene, Email } from '../../../../lib'

const REGISTER_SCENE1: string = 'register1'
const REGISTER_SCENE2: string = 'register2'

@Entity
export default class User {

  @Type('string')
  @ValidationScene(REGISTER_SCENE1, REGISTER_SCENE2)
  @Required("uid是必填的参数")
  public uid = undefined

  @Required
  @Email
  @Size(2, 30, 'name的长度应该位于$min-$max之间')
  public name = undefined

  @Type('number')
  @ValidationScene(REGISTER_SCENE2)
  @Required("age is required")
  @Between(18, 20)
  public age = undefined

}