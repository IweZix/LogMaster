import {
    Channel,
    Events,
    EmbedBuilder,
    CategoryChannel,
    TextChannel,
    ChannelType
} from 'discord.js'

import { parse } from '@/utils/json'
import { ExtendedChannelInteraction } from '@/base/interfaces/ICustomChannelInteraction'

const jsonPath = './data/log.json'

const embed = new EmbedBuilder()
    .setTitle('Channel Created')
    .setColor('#00FF00')
    .setTimestamp()

module.exports = {
    name: Events.ChannelCreate,

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
                A new ${ChannelType[interaction.type]} channel has been created.
                > **name:** <#${interaction.id}>
                > **parent:** ${parent.toString()}
                > **executor:** <@${executor}>
            `)
        } else {
            embed.setDescription(`
                A new ${ChannelType[interaction.type]} channel has been created.
                > **name:** <#${interaction.id}>
                > **executor:** <@${executor}>
            `)
        }

        return await logChannel.send({ embeds: [embed] })
    }
}
