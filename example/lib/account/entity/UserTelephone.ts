import {Entity, TableNameSeperatorType} from '../../../../lib'

@Entity(TableNameSeperatorType.underline)
export default class UserTelephone {
  uid: string = undefined
  phonenumber: number = undefined
}