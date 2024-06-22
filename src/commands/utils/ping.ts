import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

module.exports = {

    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Get the bot latency")
        .setDMPermission(true)
        .setDefaultMemberPermissions(null),

    async run(interaction: any) {

        try {
            const embed = new EmbedBuilder()
                .setTitle("Ping")
                .setColor("#AA00FF")
                .setDescription(`Ping : \`${interaction?.client?.ws?.ping}\`.`)
                .setFooter({text: `© 2024 | ${interaction?.client?.user?.username}`})
                .setTimestamp()
            ;

            const rowButton = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("ping")
                        .setEmoji("🔄")
                        .setLabel("Refresh")
                        .setStyle(ButtonStyle.Secondary)
                        
                )
            ;
            
            await interaction.reply({ embeds: [embed], components: [rowButton] });
        } catch (error) {
            await interaction.reply("There was an error while executing this command!");
        }
    }

};
