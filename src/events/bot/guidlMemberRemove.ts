import { Events, EmbedBuilder, TextChannel, GuildMember } from 'discord.js';

import { CustomClient } from '@/base/classes/CustomClient';
import { getLogChannel } from '@/services/guildServices';

const embed = new EmbedBuilder()
    .setTitle('⚙️               Member Left               ⚙️')
    .setColor('#00FF00')
    .setTimestamp();

/**
 * Launch when a member leaves the server
 */
module.exports = {
    name: Events.GuildMemberRemove,

    /**
     * Run the event
     * @param {CustomClient} client The client
     * @param {GuildMember} member The member
     * @returns {Promise<void>} Send a message in the log channel
     */
    async run(client: CustomClient, member: GuildMember) {
        const logChannel: TextChannel | null = getLogChannel(member.guild);

        if (!logChannel) {
            return;
        }

        embed
            .setDescription(
                `
            A member has left the server.
            > **name:** <#${member.id}>
        `
            )
            .setThumbnail(member.user.displayAvatarURL());

        return await logChannel.send({ embeds: [embed] });
    }
};
