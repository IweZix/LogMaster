import {
    Events,
    TextChannel,
    EmbedBuilder,
    ChannelType,
    CategoryChannel
} from 'discord.js';

import { parse } from '@/utils/json';
import { CustomClient } from '@/base/classes/CustomClient';
import { ICustomChannel } from '@/base/interfaces/ICustomChannel';

const jsonPath = './data/log.json';

const embed = new EmbedBuilder()
    .setTitle('Channel Deleted')
    .setColor('#00FF00')
    .setTimestamp();

module.exports = {
    name: Events.ChannelDelete,

    async run(client: CustomClient, channel: ICustomChannel) {
        const guildId = channel.guild?.id;
        const data = parse(jsonPath, []);
        const guildData = data.find((data: any) => data.guildId === guildId);

        if (!guildData) {
            return;
        }

        const logChannel = channel.guild?.channels.cache.get(
            guildData.logChannelId
        ) as TextChannel;

        if (!logChannel) {
            return;
        }

        const logs = (await channel.guild
            .fetchAuditLogs({ type: 12 })
            .then((audit) => audit.entries.first())) || { executor: null };
        const executor = logs.executor?.id || 'Unknown';

        if (channel.parentId) {
            const parent = channel.guild?.channels.cache.get(
                channel.parentId
            ) as CategoryChannel;
            embed.setDescription(`
                A ${ChannelType[channel.type]} channel has been deleted.
                > **name:** ${channel.name}
                > **parent:** ${parent.toString()}
                > **executor:** <@${executor}>
            `);
        } else {
            embed.setDescription(`
                A ${ChannelType[channel.type]} channel has been deleted.
                > **name:** ${channel.name}
                > **executor:** <@${executor}>
            `);
        }

        return await logChannel.send({ embeds: [embed] });
    }
};
