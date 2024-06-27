import {
    Events,
    TextChannel,
    EmbedBuilder,
    ChannelType,
    CategoryChannel,
    GuildMember
} from 'discord.js';

import { ICustomChannel } from '@/base/interfaces/ICustomChannel';
import { parse } from '@/utils/json';
import { CustomClient } from '@/base/classes/CustomClient';
import { getExecutor, getLogChannel } from '@/services/guildServices';

const jsonPath = './data/log.json';

const embed = new EmbedBuilder()
    .setTitle('⚙️               Channel Update               ⚙️')
    .setColor('#00FF00')
    .setTimestamp();

module.exports = {
    name: Events.ChannelUpdate,

    async run(client: CustomClient, oldChannel: ICustomChannel, newChannel: ICustomChannel) {
        const logChannel: TextChannel | null = getLogChannel(newChannel.guild);

        if (!logChannel) {
            return;
        }

        const executor: GuildMember = await getExecutor(newChannel.guild);

        let changes = '';

        if (oldChannel.name !== newChannel.name) {
            changes += `> **Name:** ${oldChannel.name} -> ${newChannel.name}\n`;
        }

        if (oldChannel.parentId !== newChannel.parentId) {
            const oldParent = oldChannel.guild?.channels.cache.get(
                oldChannel.parentId || 'Unknown'
            ) as CategoryChannel;
            const newParent = newChannel.guild?.channels.cache.get(
                newChannel.parentId || 'Unknown'
            ) as CategoryChannel;
            changes += `> **Parent:** ${oldParent.toString()} -> ${newParent.toString()}\n`;
        }

        if (oldChannel.nsfw !== newChannel.nsfw) {
            changes += `> **NSFW:** ${oldChannel.nsfw === true ? 'Enable' : 'Disable'} -> ${newChannel.nsfw === true ? 'Enable' : 'Disable'}\n`;
        }

        if (changes === '') {
            return;
        }

        if (newChannel.parentId) {
            const parent = newChannel.guild?.channels.cache.get(
                newChannel.parentId
            ) as CategoryChannel;
            embed.setDescription(`
                A ${ChannelType[newChannel.type]} channel has been updated.
                > **name:** <#${newChannel.id}>
                > **parent:** ${parent.toString()}
                > **executor:** ${executor}
                
                __**changes:**__
                ${changes}
            `);
        } else {
            embed.setDescription(`
                A ${ChannelType[newChannel.type]} channel has been updated.
                > **name:** <#${newChannel.id}>
                > **executor:** ${executor}

                __**changes:**__
                ${changes}
            `);
        }

        return await logChannel.send({ embeds: [embed] });
    }
};
