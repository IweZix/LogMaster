import { CustomClient } from '@/base/classes/CustomClient';
import { getExecutor, getLogChannel } from '@/services/guildServices';
import { parse } from '@/utils/json';
import {
    EmbedBuilder,
    Events,
    GuildMember,
    Role,
    TextChannel
} from 'discord.js';

const jsonPath = './data/log.json';

const embed = new EmbedBuilder()
    .setTitle('⚙️               Role Created               ⚙️')
    .setColor('#00FF00')
    .setTimestamp();

module.exports = {
    name: Events.GuildRoleCreate,

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
