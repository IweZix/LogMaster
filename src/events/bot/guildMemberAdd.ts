import {
    Events,
    EmbedBuilder,
    TextChannel,
    GuildMember,
} from 'discord.js';

import { parse } from '@/utils/json';
import { CustomClient } from '@/base/classes/CustomClient';
import { getLogChannel } from '@/services/guildServices';

const jsonPath = './data/log.json';

const embed = new EmbedBuilder()
    .setTitle('Member Joined')
    .setColor('#00FF00')
    .setTimestamp();

module.exports = {
    name: Events.GuildMemberAdd,

    async run(client: CustomClient, member: GuildMember) {
        const logChannel: TextChannel | null = getLogChannel(member.guild);

        if (!logChannel) {
            return;
        }
            
        embed.setDescription(`
            A new member has joined the server.
            > **name:** <#${member.id}>
        `).setThumbnail(member.user.displayAvatarURL());

        return await logChannel.send({ embeds: [embed] });
    }
};
