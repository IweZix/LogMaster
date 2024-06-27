import {
    Events,
    EmbedBuilder,
    CategoryChannel,
    TextChannel,
    ChannelType,
    GuildMember
} from 'discord.js';

import { ICustomChannel } from '@/base/interfaces/ICustomChannel';
import { CustomClient } from '@/base/classes/CustomClient';
import { getExecutor, getLogChannel } from '@/services/guildServices';

const embed = new EmbedBuilder()
    .setTitle('⚙️               Channel Create               ⚙️')
    .setColor('#00FF00')
    .setTimestamp();

/**
 * Launch when a channel is created
 */
module.exports = {
    name: Events.ChannelCreate,

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
                A new ${ChannelType[channel.type]} channel has been created.
                > **name:** <#${channel.id}>
                > **parent:** ${parent.toString()}
                > **executor:** ${executor}
            `
                )
                .setThumbnail(executor.displayAvatarURL());
        } else {
            embed
                .setDescription(
                    `
                A new ${ChannelType[channel.type]} channel has been created.
                > **name:** <#${channel.id}>
                > **executor:** ${executor}
            `
                )
                .setThumbnail(executor.displayAvatarURL());
        }

        return await logChannel.send({ embeds: [embed] });
    }
};
