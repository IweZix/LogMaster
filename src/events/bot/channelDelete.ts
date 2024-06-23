import { Events, Channel, TextChannel, EmbedBuilder, ChannelType, CategoryChannel, AuditLogEvent } from "discord.js";

import { ExtendedChannelInteraction } from "@/base/interfaces/ICustomChannelInteraction";
import { parse } from '@/utils/json'

const jsonPath = './data/log.json'

const embed = new EmbedBuilder()
    .setTitle('Channel Created')
    .setColor('#00FF00')
    .setTimestamp()

module.exports = {
    name: Events.ChannelDelete,

    async run(channel: Channel, interaction: ExtendedChannelInteraction) {
        
        const guildId = interaction.guild?.id
        const data = parse(jsonPath, [])
        const guildData = data.find((data: any) => data.guildId === guildId)

        if (!guildData) {
            return
        }

        const logChannel = interaction.guild?.channels.cache.get(
            guildData.logChannelId
        ) as TextChannel

        if (!logChannel) {
            return
        }

        const logs = await interaction.guild.fetchAuditLogs(
            { type: 12 }
        ).then(audit => audit.entries.first()) || { executor: null };
        const executor = logs.executor?.id || 'Unknown';
        
        

        if (interaction.parentId) {
            const parent = interaction.guild?.channels.cache.get(
                interaction.parentId
            ) as CategoryChannel
            embed.setDescription(`
                A ${ChannelType[interaction.type]} channel has been deleted.
                > **name:** ${interaction.name}
                > **parent:** ${parent.toString()}
                > **executor:** <@${executor}>
            `)
        } else {
            embed.setDescription(`
                A ${ChannelType[interaction.type]} channel has been deleted.
                > **name:** ${interaction.name}
                > **executor:** <@${executor}>
            `)
        }

        return await logChannel.send({ embeds: [embed] })
    }
}