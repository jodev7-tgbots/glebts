import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop({ required: true, index: true, unique: true })
  id!: number
  @prop({ required: true, default: 'ru' })
  language!: string
  @prop({ required: true, default: 'user' })
  role!: string
  @prop({ required: true, default: 'None' })
  username!: string
}

const UserModel = getModelForClass(User)

export function findOrCreateUser(id: number, username: string | undefined) {
  return UserModel.findOneAndUpdate(
    { id },
    { username },
    {
      upsert: true,
      new: true,
    }
  )
}
