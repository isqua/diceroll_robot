import type { User, UserFromGetMe } from "typegram";

export const API_URL = "https://api.telegram.org/";
export const API_HOST = "api.telegram.org:443";
export const BOT_TOKEN = "JEST";

export enum ApiEndPoint {
    getMe = "getMe",
    deleteWebhook = "deleteWebhook",
    getUpdates = "getUpdates",
    sendMessage = "sendMessage",
}

export const botUser: UserFromGetMe = {
    id: 1234567890,
    is_bot: true,
    first_name: "diceroll_robot",
    username: "diceroll_robot",
    can_join_groups: true,
    can_read_all_group_messages: false,
    supports_inline_queries: false,
};

export const fakeUser: User = {
    id: 1,
    is_bot: false,
    first_name: "Alex",
    username: "user",
    language_code: "en",
};
