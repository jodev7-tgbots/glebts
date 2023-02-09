import Context, { MyConversation, MyContext } from '@/models/Context'
import sendOptions from '@/helpers/sendOptions'
import languageMenu from '@/menus/language'
import bot from '@/helpers/bot'



export default async function handleStart(ctx: Context) {
    await ctx.replyWithLocalization('language', {
        ...sendOptions(ctx),
        reply_markup: languageMenu,
    })
}

export const ucPrice = async (ctx: MyContext, conversation: MyConversation) => {
    await ctx.reply("Hi there! What is your name?");
    const { message } = await conversation.wait();
    await ctx.reply(`Welcome to the chat, ${message?.text}!`);
}

bot.hears('🌎 Pubg Mobile 🌎', async (ctx) => {
    await ctx.reply('👇', {
        reply_markup: {
            one_time_keyboard: true,
            resize_keyboard: true,
            keyboard: [
                [{ text: '60uc' }, { text: '120uc' }]
            ]
        }
    })
})



bot.on(':photo', async (ctx) => {
    //await ctx.conversation.enter()
    console.log(ctx)
})