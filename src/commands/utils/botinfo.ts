import { config } from '@/config';
import {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Interaction
} from 'discord.js';

/**
 * Botinfo command
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Get the bot information')
        .setDMPermission(true)
        .setDefaultMemberPermissions(null),

    /**
     * Run the interaction
     * @param {any} interaction The interaction
     */
    async run(interaction: any) {
        try {
            const embed = new EmbedBuilder()
                .setTitle('Information about the bot')
                .setColor('#AA00FF')
                .setDescription(`
                    __**Bot informations**__
                    **Name**: ${interaction?.client?.user?.username}
                    **Tag**: ${interaction?.client?.user?.tag}
                    **Id**: ${interaction?.client?.user?.id}
                    **Avatar**: [Click here](${interaction?.client?.user?.displayAvatarURL()})

                    __**Account informations**__
                    **Creation date**: ${interaction?.client?.user?.createdAt}
                    **Arrival date**: ${interaction?.client?.user?.joinedAt}
                `)
                .setFooter({
                    text: `© 2024 | ${interaction?.client?.user?.username}`
                })
                .setTimestamp()
                .setThumbnail(interaction?.client?.user?.displayAvatarURL());
            
                const rowButton = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel('Invite me')
                        .setEmoji('💌')
                        .setURL(config.inviteBotUrl),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel('Support server')
                        .setEmoji('🛠️')
                        .setURL(config.supportServerUrl),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel('Website')
                        .setEmoji('🌐')
                        .setURL(config.webSiteUrl)
                );

            await interaction.reply({embeds: [embed], components: [rowButton]});
        } catch (error) {
            await interaction.reply(
                'There was an error while executing this command!'
            );
        }
    }
};
