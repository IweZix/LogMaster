import {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChannelType,
    EmbedBuilder
} from 'discord.js';

import { parse, serialize } from '@/utils/json';

let jsonPath = './data/log.json';

const setupEmbed = new EmbedBuilder()
    .setTitle('Log Channel setup')
    .setColor('#00FF00')
    .setTimestamp();

const updateEmbed = new EmbedBuilder()
    .setTitle('Log Channel updated')
    .setColor('#00FF00')
    .setTimestamp();

/**
 * Command to setup the log channel.
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('setuplog')
        .setDescription('Setup the log channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption((opt) =>
            opt
                .setName('channel')
                .setDescription('The channel where the logs will be sent')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),

    async run(interaction: any) {
        try {
            const logChannel = interaction.options.getChannel('channel');
            const guildId = interaction.guild.id;

            const fileData = parse(jsonPath, []);

            const guildData = fileData.find(
                (data: any) => data.guildId === guildId
            );

            if (!guildData) {
                fileData.push({
                    guildId: guildId,
                    logChannelId: logChannel.id
                });
                serialize(jsonPath, fileData);

                setupEmbed.setDescription(
                    `The log channel has been set to ${logChannel.toString()}`
                );
                return await interaction.reply({ embeds: [setupEmbed] });
            } else {
                const oldLogChannel = interaction.guild.channels.cache.get(
                    guildData.logChannelId
                );

                if (oldLogChannel === logChannel) {
                    return await interaction.reply(
                        'The log channel is already set to this channel!'
                    );
                }

                guildData.logChannelId = logChannel.id;
                serialize(jsonPath, fileData);

                updateEmbed.setDescription(`
                    The log channel has been updated from ${oldLogChannel ? oldLogChannel : 'deleted channel'} to ${logChannel}
                `);
                return await interaction.reply({ embeds: [updateEmbed] });
            }
        } catch (error) {
            await interaction.reply(
                'There was an error while executing this command!'
            );
        }
    }
};
