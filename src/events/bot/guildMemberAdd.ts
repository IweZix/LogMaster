import {
    Events,
    EmbedBuilder,
    TextChannel,
    User,
    Guild,
    GuildMember,
} from 'discord.js';

import { parse } from '@/utils/json';
import { CustomClient } from '@/base/classes/CustomClient';

const jsonPath = './data/log.json';

const embed = new EmbedBuilder()
    .setTitle('Channel Created')
    .setColor('#00FF00')
    .setTimestamp();

module.exports = {
    name: Events.GuildMemberAdd,

    async run(client: CustomClient, member: GuildMember) {
        const guildId = member.guild?.id;
        const data = parse(jsonPath, []);
        const guildData = data.find((data: any) => data.guildId === guildId);

        if (!guildData) {
            return;
        }

        const logChannel = member.guild?.channels.cache.get(
            guildData.logChannelId
        ) as TextChannel;

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
