import { ComponentType, EmbedBuilder } from 'discord.js';

module.exports = {
    name: 'ping',
    type: ComponentType.Button,

    async run(interaction: any) {
        const embed = new EmbedBuilder()
            .setTitle('Ping')
            .setColor('#AA00FF')
            .setDescription(`Ping : \`${interaction.client.ws.ping}\`.`)
            .setFooter({
                text: `© 2024 | ${interaction.client.user.username}`
            })
            .setTimestamp();

        await interaction.message.edit({ embeds: [embed] });
        await interaction.deferUpdate();
    }
};
