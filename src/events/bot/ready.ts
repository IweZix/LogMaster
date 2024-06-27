import { Events, ActivityType } from 'discord.js';

import FastLogging from 'fastlogging';

const logger = new FastLogging(true, true);

/**
 * Launches when the bot is ready
 */
module.exports = {
    name: Events.ClientReady,

    /**
     * Run the event
     * @param {any} client The client
     */
    async run(client: any) {
        await client.application.commands.set(
            client.commands.map((command: any) => command.data)
        );

        logger.info(`[SlashCommands] => loaded`);

        client.user.setActivity(`${client.guilds.cache.size} server(s)`, {
            type: ActivityType.Watching
        });

        logger.success(`[Bot] => ${client.user.username} is online`);
    }
};
