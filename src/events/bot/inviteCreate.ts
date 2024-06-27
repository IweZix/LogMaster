import { CustomClient } from "@/base/classes/CustomClient";
import { getExecutor, getLogChannel } from "@/services/guildServices";
import { EmbedBuilder, Events, Guild, GuildMember, Invite, TextChannel } from "discord.js";

const jsonPath = './data/log.json';

const embed: EmbedBuilder = new EmbedBuilder()
    .setTitle('⚙️               Invite Create               ⚙️')
    .setColor('#00FF00')
    .setTimestamp();

module.exports = {
    name: Events.InviteCreate,

    async run(client: CustomClient, invite: Invite) {
        if (!invite.guild || !(invite.guild instanceof Guild)) {
            return;
        }
        
        const logChannel: TextChannel | null = getLogChannel(invite.guild);

        if (!logChannel) {
            return;
        }

        const executor: GuildMember = await getExecutor(invite.guild);
        
        embed.setDescription(`
            The guild has been updated.
            > **Executor:** <@${executor?.id || 'Unknown'}>
            > **Date:** ${new Date().toLocaleString()}
            > **Link:** ${invite.url}
        `).setThumbnail(executor.displayAvatarURL());

        return await logChannel.send({embeds: [embed]});
    }
}