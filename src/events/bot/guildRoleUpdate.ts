import { CustomClient } from "@/base/classes/CustomClient";
import { parse } from "@/utils/json";
import { EmbedBuilder, Events, Role, TextChannel } from "discord.js";

const jsonPath = './data/log.json';

const embed = new EmbedBuilder()
    .setTitle('Role Updated')
    .setColor('#00FF00')
    .setTimestamp();

module.exports = {
    name: Events.GuildRoleUpdate,

    async run(client: CustomClient, oldRole: Role, newRole: any) {
        const guildId = newRole.guild?.id;
        const data = parse(jsonPath, []);
        const guildData = data.find((data: any) => data.guildId === guildId);

        if (!guildData) {
            return;
        }

        const logChannel = newRole.guild?.channels.cache.get(
            guildData.logChannelId
        ) as TextChannel;

        if (!logChannel) {
            return;
        }

        const logs = (await newRole.guild
            .fetchAuditLogs({ type: 12 })
            .then((audit: { entries: { first: () => any; }; }) => audit.entries.first())) || { executor: null };
        const executor = logs.executor;

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

        embed.setDescription(`
            > **Role:** ${newRole}
            > **Executor:** <@${executor?.id || 'Unknown'}>

            __**Changes:**__
            ${changes}`
        ).setThumbnail(executor.displayAvatarURL());

        return await logChannel.send({ embeds: [embed]});
    }
};
