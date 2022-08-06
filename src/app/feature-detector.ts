import { SingleNumberFeature } from "./features/single-number";

import type { Context } from "telegraf";
import type { Message } from "typegram";

const isTextMessage = (msg: unknown): msg is Message.TextMessage => {
    return Object.prototype.hasOwnProperty.call(msg, "text");
};

const features = [SingleNumberFeature];

export const detectFeature = (ctx: Context) => {
    if (!isTextMessage(ctx.message)) {
        return;
    }

    const text = ctx.message.text.trim();

    const feature = features.find((f) => f.canAnswer(text));

    if (feature) {
        return feature.getAnswer(text);
    }
};
