import { CustomClient } from '@/base/classes/CustomClient';
import { getExecutor, getLogChannel } from '@/services/guildServices';
import {
    EmbedBuilder,
    Events,
    Guild,
    GuildMember,
    TextChannel
} from 'discord.js';

const embed: EmbedBuilder = new EmbedBuilder()
    .setTitle('⚙️               Guild Updated               ⚙️')
    .setColor('#00FF00')
    .setTimestamp();

/**
 * Launch when a guild is updated
 */
module.exports = {
    name: Events.GuildUpdate,

    /**
     * Run the event
     * @param {CustomClient} client The client
     * @param {Guild} oldGuild The old guild
     * @param {Guild} newGuild The new guild
     * @returns {Promise<void>} Send a message in the log channel
     */
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

        embed
            .setDescription(
                `
            The guild has been updated.
            > **Executor:** <@${executor?.id || 'Unknown'}>
            > **Date:** ${new Date().toLocaleString()}

            __**Changes:**__
            ${changes}`
            )
            .setThumbnail(executor.displayAvatarURL());

        return await logChannel.send({ embeds: [embed] });
    }
};
