import { CustomClient } from '@/base/classes/CustomClient';
import { getExecutor, getLogChannel } from '@/services/guildServices';
import {
    EmbedBuilder,
    Events,
    Guild,
    GuildMember,
    Message,
    TextChannel
} from 'discord.js';

const embed: EmbedBuilder = new EmbedBuilder()
    .setTitle('⚙️               Message Delete               ⚙️')
    .setColor('#00FF00')
    .setTimestamp();

/**
 * Launch when a message is deleted
 */
module.exports = {
    name: Events.MessageDelete,

    /**
     * Run the event
     * @param {CustomClient} client The client
     * @param {Message} message The message
     * @returns {Promise<void>} Send a message in the log channel
     */
    async run(client: CustomClient, message: Message) {
        if (!message.guild || !(message.guild instanceof Guild)) {
            return;
        }

        const logChannel: TextChannel | null = getLogChannel(message.guild);

        if (!logChannel) {
            return;
        }

        const executor: GuildMember = await getExecutor(message.guild);

        embed
            .setDescription(
                `
            A message has been deleted.
            > **Executor:** <@${executor?.id || 'Unknown'}>
            > **Date:** ${new Date().toLocaleString()}
            > **Channel:** <#${message.channel.id}>
            > **Author:** <@${message.author.id}>
            
            __**Content:**__
            ${message.content}
        `
            )
            .setThumbnail(executor.displayAvatarURL());

        return await logChannel.send({ embeds: [embed] });
    }
};
