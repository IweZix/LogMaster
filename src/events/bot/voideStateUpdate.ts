import { CustomClient } from "@/base/classes/CustomClient";
import { ICustomChannel } from "@/base/interfaces/ICustomChannel";
import { getLogChannel, getExecutorById } from "@/services/guildServices";
import { EmbedBuilder, Events, GuildMember, TextChannel, VoiceChannel } from "discord.js";

const embed: EmbedBuilder = new EmbedBuilder()
    .setTitle('⚙️               Voice State Update               ⚙️')
    .setColor('#00FF00')
    .setTimestamp();

/**
 * Launch when a voice state is updated
 */
module.exports = {
    name: Events.VoiceStateUpdate,

    /**
     * Run the event
     * @param {CustomClient} client The client
     * @param {VoiceChannel} oldChannel The old voice channel
     * @param {VoiceChannel} newChannel The new voice channel
     * @returns {Promise<void>} Send a message in the log channel
     */
    async run(client: CustomClient, oldChannel: ICustomChannel, newChannel: ICustomChannel) {

        let logChannel: TextChannel | null;
        const executor: GuildMember = await getExecutorById(newChannel.guild, newChannel.id);
        
        

        if (!oldChannel) {
            logChannel = getLogChannel(newChannel.guild);
        } else {
            logChannel = getLogChannel(oldChannel.guild);
        }

        if (!logChannel) {
            console.log('Log channel not found');
            return;
        }

        const oldChannelId: Number = oldChannel?.channelId || 0;
        const newChannelId: Number = newChannel?.channelId || 0;

        if (oldChannelId !== 0 && newChannelId !== 0) {
            embed.setDescription(
                `
                A member has switched voice channel.
                > **old channel:** <#${oldChannel.channelId}>
                > **new channel:** <#${newChannel.channelId}>
                > **member:** ${executor}
            `
            ).setThumbnail(executor.displayAvatarURL());

        } else if (oldChannelId === 0) {
            embed.setDescription(
                `
                A member has joined the voice channel.
                > **channel:** <#${newChannel.channelId}>
                > **member:** ${executor}
            `
            ).setThumbnail(executor.displayAvatarURL());

        } else if (newChannelId === 0) {
            embed.setDescription(
                `
                A member has left the voice channel.
                > **channel:** <#${oldChannel.channelId}>
                > **member:** ${executor}
            `
            ).setThumbnail(executor.displayAvatarURL());
            
        } else {
            return logChannel.send(
                { content: 'An error occurred while member was switching voice channel.' }
            );
        }

        return await logChannel.send({ embeds: [embed] });
        
    }
};