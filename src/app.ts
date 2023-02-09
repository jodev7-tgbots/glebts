import 'module-alias/register'
import 'reflect-metadata'
import 'source-map-support/register'

import { session } from "grammy";
import { ignoreOld, sequentialize } from 'grammy-middlewares'
import { conversations, createConversation } from "@grammyjs/conversations";
import { run } from '@grammyjs/runner'
import attachUser from '@/middlewares/attachUser'
import bot from '@/helpers/bot'
import configureI18n from '@/middlewares/configureI18n'
import handleLanguage from '@/handlers/language'
import i18n from '@/helpers/i18n'
import languageMenu from '@/menus/language'
import sendHelp from '@/handlers/help'
import startMongo from '@/helpers/startMongo'
import handleStart, { ucPrice } from '@/handlers/start'
import env from '@/helpers/env'

const splited = env.ADMINS.split(',')

async function runApp() {
  console.log('Starting app...')
  // Mongo
  await startMongo()
  console.log('MongoDB Succussfully connected')
  bot
    // Middlewares
    .use(sequentialize())
    .use(ignoreOld())
    .use(attachUser)
    .use(i18n.middleware())
    .use(configureI18n)
    .use(session({
      initial() {
        // return empty object for now
        return {};
      },
    }))
    .use(conversations())
    .use(createConversation(ucPrice, "ucPrice"))
    // Menus
    .use(languageMenu)

  bot.api.setMyCommands([
    { command: '/start', description: '🚀 Запустить бота' },
    { command: '/info', description: '🪄 Информация о боте' },
    { command: '/language', description: '🌎 Изменить язык' },
  ]).then(() => {
    console.log('Bot Commands successfully installed')
  }).catch((e) => {
    console.log(`Error on installing Bot Commands.\nError: ${e}`)
  })

  // Commands
  bot.command('start', handleStart)
  bot.command('info', sendHelp)
  bot.command('language', handleLanguage)
  // Errors
  bot.catch(console.error)
  // Start bot
  await bot.init()
  run(bot)
  console.info(`Bot @${bot.botInfo.username} is up and running`)

  for (const admin of splited) {
    bot.api.sendMessage(Number(admin), 'Bot Started!')
  }
}

void runApp()
