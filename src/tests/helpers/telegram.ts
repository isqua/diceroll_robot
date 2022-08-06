import { beforeAll } from "@jest/globals";
import * as nock from "nock";
import { API_HOST, API_URL, ApiEndPoint, botUser, fakeUser } from "./constants";

import type { Update } from "typegram";
import type { BotReplyMessage } from "./types";

beforeAll(() => {
    nock.disableNetConnect();
    nock.enableNetConnect(API_HOST);
});

export class BotTester {
    private updateId: number = 0;
    private messageId: number = 0;
    private updateScope: nock.Scope;

    constructor(private token: string) {}

    public launch() {
        this.nockEndpoint(ApiEndPoint.getMe)
            .reply(200, this.getSuccessResult(botUser))
            .persist(true);

        this.nockEndpoint(ApiEndPoint.deleteWebhook)
            .reply(200, this.getSuccessResult("true"))
            .persist(true);

        this.updateScope = this.nockEndpoint(ApiEndPoint.getUpdates)
            .reply(200, this.getSuccessResult([]))
            .persist(true);
    }

    public async getMessageReply(text: string): Promise<BotReplyMessage> {
        const updates = [this.getMessageUpdate(text)];

        return new Promise((resolve) => {
            this.nockEndpoint(ApiEndPoint.getUpdates).reply(
                200,
                this.getSuccessResult(updates)
            );

            this.nockEndpoint(ApiEndPoint.sendMessage, (body: BotReplyMessage) => {
                this.nockEndpoint(ApiEndPoint.getUpdates).reply(200, []);

                resolve(body);

                return true;
            }).reply(200, this.getSuccessResult("true"));

            this.updateScope.persist(false);
        });
    }

    public getLastMessageId() {
        return this.messageId;
    }

    private getEndpointPath(endpoint: ApiEndPoint) {
        return `/bot${this.token}/${endpoint}`;
    }

    private nockEndpoint(
        endpoint: ApiEndPoint,
        requestBody?: nock.RequestBodyMatcher
    ) {
        return nock(API_URL).post(this.getEndpointPath(endpoint), requestBody);
    }

    private getSuccessResult(result: unknown) {
        return { ok: true, result };
    }

    private getMessageUpdate(text: string): Update.MessageUpdate {
        return {
            update_id: ++this.updateId,
            message: {
                message_id: ++this.messageId,
                from: fakeUser,
                chat: {
                    id: fakeUser.id,
                    first_name: fakeUser.first_name,
                    username: fakeUser.username,
                    type: "private",
                },
                date: new Date().valueOf() / 1000,
                text: text,
            },
        };
    }
}
