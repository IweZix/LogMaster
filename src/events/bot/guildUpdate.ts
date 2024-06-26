import { CustomClient } from "@/base/classes/CustomClient";
import { getExecutor, getLogChannel } from "@/services/guildServices";
import { EmbedBuilder, Events, Guild, GuildMember, Role, TextChannel } from "discord.js";

const jsonPath = './data/log.json';

const embed: EmbedBuilder = new EmbedBuilder()
    .setTitle('⚙️               Guild Updated               ⚙️')
    .setColor('#00FF00')
    .setTimestamp();

module.exports = {
    name: Events.GuildUpdate,

    async run(client: CustomClient, oldGuild: Guild, newGuild: Guild) {              
        const logChannel: TextChannel | null = getLogChannel(newGuild);

        if (!logChannel) {
            return;
        }

        const executor: GuildMember = await getExecutor(newGuild);

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