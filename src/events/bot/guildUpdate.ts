import { CustomClient } from "@/base/classes/CustomClient";
import { parse } from "@/utils/json";
import { EmbedBuilder, Events, Guild, Role, TextChannel } from "discord.js";

const jsonPath = './data/log.json';

const embed = new EmbedBuilder()
    .setTitle('⚙️               Guild Updated               ⚙️')
    .setColor('#00FF00')
    .setTimestamp();

module.exports = {
    name: Events.GuildUpdate,

    async run(client: CustomClient, oldGuild: Guild, newGuild: Guild) {              
        const guildId = newGuild.id;
        const data = parse(jsonPath, []);
        const guildData = data.find((data: any) => data.guildId === guildId);

        if (!guildData) {
            return;
        }

        const logChannel = newGuild.channels.cache.get(
            guildData.logChannelId
        ) as TextChannel;

        if (!logChannel) {
            return;
        }

        const logs = (await newGuild
            .fetchAuditLogs({ type: 12 })
            .then((audit: { entries: { first: () => any; }; }) => audit.entries.first())) || { executor: null };
        const executor = logs.executor;

        let changes = '';

        if (oldGuild.name !== newGuild.name) {
            changes += `> **Name:** ${oldGuild.name} -> ${newGuild.name}\n`;
        }

        if (oldGuild.icon !== newGuild.icon) {
            changes += `> **Icon:** ${oldGuild.icon} -> ${newGuild.icon}\n`;
        }

        if (oldGuild.ownerId !== newGuild.ownerId) {
            changes += `> **Owner:** ${oldGuild.ownerId} -> ${newGuild.ownerId}\n`;
        }

        if (oldGuild.invites !== newGuild.invites) {
            changes += `> **Invites:** ${oldGuild.invites} -> ${newGuild.invites}\n`;
        }

        if (oldGuild.verificationLevel !== newGuild.verificationLevel) {
            changes += `> **Verification Level:** ${oldGuild.verificationLevel} -> ${newGuild.verificationLevel}\n`;
        }

        if (oldGuild.nsfwLevel !== newGuild.nsfwLevel) {
            changes += `> **NSFW Level:** ${oldGuild.nsfwLevel} -> ${newGuild.nsfwLevel}\n`;
        }
        
        embed.setDescription(`
            The guild has been updated.
            > **Executor:** <@${executor?.id || 'Unknown'}>
            > **Date:** ${new Date().toLocaleString()}

            __**Changes:**__
            ${changes}`
        ).setThumbnail(executor.displayAvatarURL());

        return await logChannel.send({embeds: [embed]});
    }
}