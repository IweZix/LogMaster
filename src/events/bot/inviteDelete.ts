import { CustomClient } from '@/base/classes/CustomClient';
import { getExecutor, getLogChannel } from '@/services/guildServices';
import {
    EmbedBuilder,
    Events,
    Guild,
    GuildMember,
    Invite,
    TextChannel
} from 'discord.js';

const jsonPath = './data/log.json';

const embed: EmbedBuilder = new EmbedBuilder()
    .setTitle('⚙️               Invite Delete               ⚙️')
    .setColor('#00FF00')
    .setTimestamp();

/**
 * Launch when an invite is deleted
 */
module.exports = {
    name: Events.InviteDelete,

    /**
     * Run the event
     * @param {CustomClient} client The client
     * @param {Invite} invite The invite
     * @returns {Promise<void>} Send a message in the log channel
     */
    async run(client: CustomClient, invite: Invite) {
        if (!invite.guild || !(invite.guild instanceof Guild)) {
            return;
        }

        const logChannel: TextChannel | null = getLogChannel(invite.guild);

        if (!logChannel) {
            return;
        }

        const executor: GuildMember = await getExecutor(invite.guild);

        embed
            .setDescription(
                `
            An invite has been deleted.
            > **Executor:** <@${executor?.id || 'Unknown'}>
            > **Date:** ${new Date().toLocaleString()}
            > **Link:** ${invite.url}
        `
            )
            .setThumbnail(executor.displayAvatarURL());

        return await logChannel.send({ embeds: [embed] });
    }
};
