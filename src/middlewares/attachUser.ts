import { NextFunction } from 'grammy'
import { findOrCreateUser } from '@/models/User'
import Context from '@/models/Context'
import env from '@/helpers/env'

export default async function attachUser(ctx: Context, next: NextFunction) {
  if (!ctx.from) {
    throw new Error('No from field found')
  }
  const user = await findOrCreateUser(ctx.from.id, ctx.from.username)
  if (!user) {
    throw new Error('User not found')
  }
  const splited = env.ADMINS.split(',')
  for (const admin of splited) {
    if (user.id === Number(admin)) {
      user.role = 'admin'
      await user.save()
    }
  }
  ctx.dbuser = user
  return next()
}
