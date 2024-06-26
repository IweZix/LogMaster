import { CustomClient } from "@/base/classes/CustomClient";
import { parse } from "@/utils/json";
import { EmbedBuilder, Events, TextChannel } from "discord.js";

const jsonPath = './data/log.json';

const embed = new EmbedBuilder()
    .setTitle('Role Created')
    .setColor('#00FF00')
    .setTimestamp();

module.exports = {
    name: Events.GuildRoleCreate,

    async run(client: CustomClient, role: any) {
        console.log(role);
        
        const guildId = role.guild?.id;
        const data = parse(jsonPath, []);
        const guildData = data.find((data: any) => data.guildId === guildId);

        if (!guildData) {
            return;
        }

        const logChannel = role.guild?.channels.cache.get(
            guildData.logChannelId
        ) as TextChannel;

        if (!logChannel) {
            return;
        }

        const logs = (await role.guild
            .fetchAuditLogs({ type: 12 })
            .then((audit: { entries: { first: () => any; }; }) => audit.entries.first())) || { executor: null };
        const executor = logs.executor?.id || 'Unknown';

        embed.setDescription(`
            A new role has been created.
            > **Role:** ${role.name}
            > **Id:** ${role.id}
            > **Managed:** ${role.managed ? 'Yes' : 'No'}
            > **Mentionable:** ${role.mentionable ? 'Yes' : 'No'}
            > **Executor:** <@${executor}>
        `);

        return await logChannel.send({ embeds: [embed]});
    }
};
