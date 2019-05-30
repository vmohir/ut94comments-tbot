"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TelegramBotAPI = require("node-telegram-bot-api");
var config_1 = require("../config");
var bot = new TelegramBotAPI(config_1.TOKEN, { polling: true });
bot.on('text', function (msg, metadata) {
    try {
        console.log('TCL: msg', msg);
        var chatId = msg.chat.id;
        if (msg.text === '/start') {
            bot.sendMessage(chatId, "\u0633\u0644\u0627\u0645\n\u062A\u0648 \u0627\u06CC\u0646 \u0628\u0627\u062A\u060C \u0634\u0645\u0627 \u0628\u0647 \u0635\u0648\u0631\u062A \u0646\u0627\u0634\u0646\u0627\u0633\u060C \u0646\u0638\u0631\u06CC \u062D\u0631\u0641\u06CC \u0634\u06A9\u0627\u06CC\u062A\u06CC \u062A\u0639\u0631\u06CC\u0641\u06CC \u0647\u0631\u0686\u06CC\u0632\u06CC \u06A9\u0647 \u0627\u0632 \u06CC\u0647 \u0646\u0641\u0631 \u062F\u0627\u0631\u06CC\u062F \u0631\u0648 \u0627\u06CC\u0646\u062C\u0627 \u0645\u06CC\u06AF\u06CC\u062F. \u0628\u0627\u0632\u0645 \u0645\u06CC\u06AF\u0645 \u06A9\u0627\u0645\u0644\u0646 \u0646\u0627\u0634\u0646\u0627\u0633.\n\u0646\u0638\u0631\u0627\u062A \u0628\u0647 \u062F\u0633\u062A \u0645\u062E\u0627\u0637\u0628 \u0647\u0627 \u0645\u06CC\u0631\u0633\u0647. \u0686\u0646\u062F\u062A\u0627 \u062C\u0627\u0644\u0628\u0627\u0634\u0648 \u0647\u0645 \u062A\u0648 \u062C\u0634\u0646 \u0645\u06CC\u0627\u0631\u06CC\u0645 \u062D\u0627\u0644\u0627 \u062A\u0648 \u06CC\u0647 \u0642\u0627\u0644\u0628\u06CC.");
        }
        // const reply_markup = getLikeDislikeKeyboard(0, 0);
        // bot.sendAudio(CHANNEL_ID, audio.file_id, { caption, title: 'vahid' }).then(x => {});
        // 'parse_mode' => 'markdown'
        bot.sendMessage(config_1.BOT_ADMIN_ID, 'send an audio');
    }
    catch (error) {
        console.error('captured error', error);
    }
});
// function get_file_link($file_id: string) {
//     global $telegram, $token;
//     $file = $telegram->getFile([
//         'file_id' => $file_id,
//     ]);
//     return 'https://api.telegram.org/file/bot' . $token . '/' . $file->getFilePath();
// }
// function make_exception_array($e)
// {
//     return [
//         'exception' => 'exception',
//         'file' => $e->getFile(),
//         'line' => $e->getLine(),
//         'message' => $e->getMessage(),
//         'code' => $e->getCode(),
//         'trace' => $e->getTraceAsString(),
//     ];
// }
// function dbg($data, $chat_id = 92454)
// {
//     $text = var_export($data, true);
//     global $telegram;
//     $telegram->sendMessage([
//         'chat_id' => $chat_id,
//         'text' => $text,
//     ]);
// }
var removeStrings = function (str, strings) { return strings.reduce(function (result, s) { return result.replace(s, ''); }, str); };
var titleFunction = function (title) {
    if (!title)
        return '';
    return removeStrings(title, [
        'FREE DOWNLOAD',
        '[FREE DOWNLOAD]',
        '[ORIGINAL MIX]',
        '[EXTENDED MIX]',
        'ORIGINAL MIX',
        'EXTENDED MIX'
    ]).trim();
};
// function makeInlineKeyboard($keyboard)
// {
//     return Telegram\Bot\Keyboard\Keyboard::make(['inline_keyboard' => $keyboard]);
// }
// function getLikeDislikeKeyboard($likes, $dislikes)
// {
//     $keyboard = [
//         [[
//             'text' => ((string) ($likes === 0 ? '' : $likes)) . ' 👍',
//             'callback_data' => json_encode(['type' => 'like', 'likes' => $likes, 'dislikes' => $dislikes]),
//         ], [
//             'text' => ((string) ($dislikes === 0 ? '' : $dislikes)) . ' 👎',
//             'callback_data' => json_encode(['type' => 'dislike', 'likes' => $likes, 'dislikes' => $dislikes]),
//         ]],
//     ];
//     return makeInlineKeyboard($keyboard);
// }
// get user message
// $updates = $telegram->getWebhookUpdates();
// $message = $updates->getMessage();
// $callback_query = $updates->getCallbackQuery();
// if ($callback_query === null && $message !== null) {
// }
// if ($callback_query != null) {
//     // dbg('wp');
//     $message = $callback_query->getMessage();
//     $data = $callback_query->getData();
//     $data = json_decode($data, true);
//     $likes = $data['likes'];
//     $dislikes = $data['dislikes'];
//     if ($data['type'] === 'like') {
//         $likes += 1;
//     }
//     if ($data['type'] === 'dislike') {
//         $dislikes -= 1;
//     }
//     // dbg($value);
//     $reply_markup = getLikeDislikeKeyboard($likes, $dislikes);
//     $telegram->editMessageReplyMarkup([
//         'chat_id' => $message->getChat()->getId(),
//         'message_id' => $message->getMessageId(),
//         'reply_markup' => $reply_markup,
//     ]);
//     // dbg($message);
//     // dbg($data);
// }
//# sourceMappingURL=index.js.map