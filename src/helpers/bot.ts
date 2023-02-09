import { Bot } from 'grammy'
import Context, { MyContext } from '@/models/Context'
import env from '@/helpers/env'

// const bot = new Bot<Context>(env.TOKEN, {
//     ContextConstructor: Context,
// })

const bot = new Bot<MyContext>(env.TOKEN)

export default bot
