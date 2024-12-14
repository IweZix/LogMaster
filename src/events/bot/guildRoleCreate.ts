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
    .setTitle('⚙️               Role Created               ⚙️')
    .setColor('#00FF00')
    .setTimestamp();

/**
 * Launch when a role is created
 */
module.exports = {
    name: Events.GuildRoleCreate,

    /**
     * Run the event
     * @param {CustomClient} client The client
     * @param {Role} role The role
     * @returns {Promise<void>} Send a message in the log channel
     */
    async run(client: CustomClient, role: Role) {
        const logChannel: TextChannel | null = getLogChannel(role.guild);

        if (!logChannel) {
            return;
        }

        const executor: GuildMember = await getExecutor(role.guild);

        embed
            .setDescription(
                `
            A new role has been created.
            > **Role:** ${role.name}
            > **Id:** ${role.id}
            > **Managed:** ${role.managed ? 'Yes' : 'No'}
            > **Mentionable:** ${role.mentionable ? 'Yes' : 'No'}
            > **Executor:** ${executor}
        `
            )
            .setThumbnail(executor.displayAvatarURL());

        return await logChannel.send({ embeds: [embed] });
    }
};
