import * as TelegramBotAPI from 'node-telegram-bot-api';
import { TOKEN, BOT_ADMIN_ID } from '../config';

const bot = new TelegramBotAPI(TOKEN, { polling: true });
const COMPUTER_UT = '💻 کامپیوتر';
const ELEC_UT = '💡 برق';
const VERIFY = '✅ همه چی درسته';
const REJECT = '❌ پشیمون شدم! کنسل کن';

type State = 'start' | 'name' | 'comment' | 'verify';
interface MemObj {
  state?: State;
  contactField?: '💻 کامپیوتر' | '💡 برق';
  contactName?: string;
  comment?: string;
}

const MEMORY: { [chatId: string]: MemObj } = {};

bot.on('text', (msg, metadata) => {
  try {
    const chatId = msg.chat.id;
    const { text } = msg;
    MEMORY[chatId] = MEMORY[chatId] || {};

    if (text === '/start') {
      startCommand(chatId);
    } else if (MEMORY[chatId].state === 'start') {
      onFieldChosen(chatId, text);
    } else if (MEMORY[chatId].state === 'name') {
      onNameChosen(text, chatId);
    } else if (MEMORY[chatId].state === 'comment') {
      onCommentChosen(text, chatId);
    } else if (MEMORY[chatId].state === 'verify' && text === REJECT) {
      onReject(chatId);
    } else if (MEMORY[chatId].state === 'verify' && text === VERIFY) {
      onVerify(chatId, text);
    } else {
      bot.sendMessage(chatId, `متاسفانه ظاهرن یه مشکلی پیش اومده. اشکال نداره از اول شروع میکنیم. لطفا /start رو بفرست`);
      MEMORY[chatId] = {};
    }
  } catch (error) {
    console.error('captured error', error);
  }
});
function onVerify(chatId: number, text: string) {
  Promise.all([
    bot.sendMessage(
      BOT_ADMIN_ID,
      `یک کامنت جدید اومده:
رشته: ${MEMORY[chatId].contactField}
اسم مخاطب: ${MEMORY[chatId].contactName}
متن پیام:
---------------------------
${MEMORY[chatId].comment}
---------------------------
`,
      { reply_markup: { remove_keyboard: true } }
    ),
    bot.sendMessage(chatId, `حله! پیامتو به صورت ناشناس واسه @mr_amdiii فرستادم. این پیامیه که واسه‌ش فرستادم:`, {
      reply_markup: { remove_keyboard: true }
    })
  ]).then(([adminSentMessage]) => {
    bot.forwardMessage(chatId, adminSentMessage.chat.id, adminSentMessage.message_id).then(_ => {
      MEMORY[chatId] = {};
    });
  });
}

function onReject(chatId: number) {
  bot.sendMessage(chatId, `کنسل شد. از اول شروع می‌کنیم`, { reply_markup: { remove_keyboard: true } }).then(_ => {
    MEMORY[chatId] = {};
    startCommand(chatId);
  });
}

function onCommentChosen(text: string | undefined, chatId: number) {
  if (!text) {
    bot.sendMessage(chatId, `پیامی که فرستادی رو تشخیص ندادم! دوباره امتحان میکنیم! لطفا یه پیام بفرست و فقط توش نظرت رو بنویس`, {
      reply_markup: { keyboard: [[]] }
    });
    return;
  }
  bot
    .sendMessage(
      chatId,
      `اوکی یه چک بکن مطمئن شو همه چی درست باشه:
---------------------------
رشته: ${MEMORY[chatId].contactField}
اسم مخاطب: ${MEMORY[chatId].contactName}
پیامت:
${text}
---------------------------
`,
      { reply_markup: { keyboard: [[{ text: VERIFY }, { text: REJECT }]], resize_keyboard: true } }
    )
    .then(sentMessage => {
      MEMORY[chatId].comment = text;
      MEMORY[chatId].state = 'verify';
    });
}

function onNameChosen(text: string | undefined, chatId: number) {
  if (!text) {
    bot.sendMessage(chatId, `اسمی که فرستادی رو تشخیص ندادم! لطفا یه پیام بفرست و فقط توش یه اسم طرف باشه`, {
      reply_markup: { keyboard: [[]] }
    });
    return;
  }
  bot
    .sendMessage(chatId, `خب حالا حرف یا نظری که میخواین در مورد طرف بگین رو بنویسین`, { reply_markup: { remove_keyboard: true } })
    .then(sentMessage => {
      MEMORY[chatId].contactName = text;
      MEMORY[chatId].state = 'comment';
    });
}

function onFieldChosen(chatId: number, text: string | undefined) {
  if (text !== COMPUTER_UT && text !== ELEC_UT) {
    bot.sendMessage(chatId, `لطفا رشته رو با دکمه هایی که پایین تلگرامت اومده مشخص کن`, {
      reply_markup: { keyboard: [[]] }
    });
    return;
  }
  bot.sendMessage(chatId, `اسم و فامیلیش رو بنویسید`, { reply_markup: { remove_keyboard: true } }).then(_ => {
    MEMORY[chatId].state = 'name';
    MEMORY[chatId].contactField = text;
  });
}

function startCommand(chatId: number) {
  bot
    .sendMessage(
      chatId,
      `سلام
تو این بات، شما به صورت ناشناس، نظری حرفی شکایتی تعریفی هرچیزی که از یه نفر دارید رو اینجا میگید. بازم میگم کاملن ناشناس.
نظرات به دست مخاطب ها میرسه. چندتا جالباشو هم تو جشن میاریم حالا تو یه قالبی.`,
      { reply_markup: { remove_keyboard: true } }
    )
    .then(_ => {
      return bot.sendMessage(chatId, `مشخص کنید شخص مخاطبتون برقیه یا کامپیوتری`, {
        reply_markup: { keyboard: [[{ text: COMPUTER_UT }, { text: ELEC_UT }]], resize_keyboard: true }
      });
    })
    .then(_ => {
      MEMORY[chatId].state = 'start';
    });
}
