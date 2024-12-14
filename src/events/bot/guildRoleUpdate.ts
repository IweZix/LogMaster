import { CustomClient } from '@/base/classes/CustomClient';
import { getExecutor, getLogChannel } from '@/services/guildServices';
import {
    EmbedBuilder,
    Events,
    GuildMember,
    Role,
    TextChannel
} from 'discord.js';

const embed = new EmbedBuilder()
    .setTitle('⚙️               Role Updated               ⚙️')
    .setColor('#00FF00')
    .setTimestamp();

/**
 * Launch when a role is updated
 */
module.exports = {
    name: Events.GuildRoleUpdate,

    /**
     * Run the event
     * @param {CustomClient} client The client
     * @param {Role} oldRole The role before the update
     * @param {Role} newRole The role after the update
     * @returns {Promise<void>} Send a message in the log channel
     */
    async run(client: CustomClient, oldRole: Role, newRole: any) {
        const logChannel: TextChannel | null = getLogChannel(newRole.guild);

        if (!logChannel) {
            return;
        }

        const executor: GuildMember = await getExecutor(newRole.guild);

        let changes = '';

        if (oldRole.name !== newRole.name) {
            changes += `> **Name:** ${oldRole.name} -> ${newRole.name}\n`;
        }

        if (oldRole.color !== newRole.color) {
            changes += `> **Color:** ${oldRole.color} -> ${newRole.color}\n`;
        }

        if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
            changes += `> **Permissions:** ${oldRole.permissions.bitfield} -> ${newRole.permissions.bitfield}\n`;
        }

        if (oldRole.mentionable !== newRole.mentionable) {
            changes += `> **Mentionable:** ${oldRole.mentionable} -> ${newRole.mentionable}\n`;
        }

        embed
            .setDescription(
                `
            > **Role:** ${newRole}
            > **Executor:** <@${executor?.id || 'Unknown'}>

            __**Changes:**__
            ${changes}`
            )
            .setThumbnail(executor.displayAvatarURL());

        return await logChannel.send({ embeds: [embed] });
    }
};
