import { Menu } from '@grammyjs/menu'
import { cwd } from 'process'
import { load } from 'js-yaml'
import { readFileSync, readdirSync } from 'fs'
import { resolve } from 'path'
import Context from '@/models/Context'
import env from '@/helpers/env'

interface YamlWithName {
  name: string
}

const localeFilePaths = readdirSync(resolve(cwd(), 'locales'))

const localeFile = (path: string) => {
  return load(
    readFileSync(resolve(cwd(), 'locales', path), 'utf8')
  ) as YamlWithName
}

const splited = env.ADMINS.split(',')

const setLanguage = (languageCode: string) => async (ctx: Context) => {
  ctx.dbuser.language = languageCode
  await ctx.dbuser.save()
  ctx.i18n.locale(languageCode)
  ctx.editMessageText(ctx.i18n.t('language_selected'), {
    parse_mode: 'HTML',
    reply_markup: undefined,
  })
  for (const admin of splited) {
    if (ctx.dbuser.id === Number(admin)) {
      return ctx.reply(ctx.i18n.t('start', { username: ctx.from?.first_name }), {
        reply_markup: {
          one_time_keyboard: true,
          resize_keyboard: true,
          keyboard: [
            [{ text: '🌎 Pubg Mobile 🌎' }],
            [{ text: ctx.i18n.t('adminka') }]
          ]
        }
      })
    } else {
      return ctx.reply(ctx.i18n.t('start', { username: ctx.from?.first_name }), {
        reply_markup: {
          one_time_keyboard: true,
          resize_keyboard: true,
          keyboard: [
            [{ text: '🌎 Pubg Mobile 🌎' }]
          ]
        }
      })
    }
  }
}



const languageMenu = new Menu<Context>('language')


localeFilePaths.forEach((localeFilePath, index) => {
  const localeCode = localeFilePath.split('.')[0]
  const localeName = localeFile(localeFilePath).name
  languageMenu.text(localeName, setLanguage(localeCode))
  if (index % 2 != 0) {
    languageMenu.row()
  }
})

export default languageMenu
