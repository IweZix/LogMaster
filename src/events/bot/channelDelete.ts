import {
    Events,
    TextChannel,
    EmbedBuilder,
    ChannelType,
    CategoryChannel,
    GuildMember
} from 'discord.js';

import { CustomClient } from '@/base/classes/CustomClient';
import { ICustomChannel } from '@/base/interfaces/ICustomChannel';
import { getExecutor, getLogChannel } from '@/services/guildServices';

const embed = new EmbedBuilder()
    .setTitle('⚙️               Channel Delete               ⚙️')
    .setColor('#00FF00')
    .setTimestamp();

/**
 * Launch when a channel is deleted
 */
module.exports = {
    name: Events.ChannelDelete,

    /**
     * Run the event
     * @param {CustomClient} client The client
     * @param {ICustomChannel} channel The channel
     * @returns {Promise<void>} Send a message in the log channel
     */
    async run(client: CustomClient, channel: ICustomChannel) {
        const logChannel: TextChannel | null = getLogChannel(channel.guild);

        if (!logChannel) {
            return;
        }

        const executor: GuildMember = await getExecutor(channel.guild);

        if (channel.parentId) {
            const parent = channel.guild?.channels.cache.get(
                channel.parentId
            ) as CategoryChannel;
            embed
                .setDescription(
                    `
                A ${ChannelType[channel.type]} channel has been deleted.
                > **name:** ${channel.name}
                > **parent:** ${parent.toString()}
                > **executor:** <@${executor}>
            `
                )
                .setThumbnail(executor.displayAvatarURL() ? executor.displayAvatarURL() : '');
        } else {
            embed
                .setDescription(
                    `
                A ${ChannelType[channel.type]} channel has been deleted.
                > **name:** ${channel.name}
                > **executor:** ${executor || 'Unknown'}
            `
                )
                .setThumbnail(executor.displayAvatarURL() ? executor.displayAvatarURL() : '');
        }

        return await logChannel.send({ embeds: [embed] });
    }
};
