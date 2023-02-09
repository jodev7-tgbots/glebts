import { Context as BaseContext } from 'grammy'
import { DocumentType } from '@typegoose/typegoose'
import { I18nContext } from '@grammyjs/i18n/dist/source'
import { User } from '@/models/User'
import {
  type Conversation,
  type ConversationFlavor,
} from "@grammyjs/conversations";

export type MyContext = Context & ConversationFlavor;
export type MyConversation = Conversation<MyContext>;

class Context extends BaseContext {
  readonly i18n!: I18nContext
  dbuser!: DocumentType<User>
  //conversation!: Conversation<MyContext>


  replyWithLocalization: this['reply'] = (text, other, ...rest) => {
    text = this.i18n.t(text)
    return this.reply(text, other, ...rest)
  }
}

export default Context
