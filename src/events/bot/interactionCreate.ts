import {
    Events,
    InteractionType,
    PermissionsBitField,
    GuildMember
} from 'discord.js';

import { ICommand } from '@/base/interfaces/ICommand';
import { ICustomClient } from '@/base/interfaces/ICustomClient';

/**
 * Launches when an interaction is created
 */
module.exports = {
    name: Events.InteractionCreate,

    /**
     * Run the event
     * @param {ICustomClient} client The client
     * @param {any} interaction The interaction
     */
    async run(client: ICustomClient, interaction: any) {
        /**
         * If the interaction is a slash command.
         */
        if (interaction.type === InteractionType.ApplicationCommand) {
            const command = client.commands.get(interaction.commandName) as
                | ICommand
                | undefined;

            if (!command) {
                return await interaction.reply({
                    content: 'Command not found.',
                    ephemeral: true
                });
            }

            const member = interaction.member as GuildMember | null;
            if (member && command.data.default_member_permissions) {
                const memberPermissions = new PermissionsBitField(
                    member.permissions
                );
                if (
                    !memberPermissions.has(
                        command.data.default_member_permissions
                    )
                ) {
                    return await interaction.reply({
                        content:
                            "You don't have permission to use this command.",
                        ephemeral: true
                    });
                }
            }

            await command.run(interaction);
        }

        /**
         * If the interaction is MessageComponent.
         */
        if (interaction.type === InteractionType.MessageComponent) {
            /**
             * If the interaction is a button.
             */
            if (interaction.isButton()) {
                const name = interaction.customId.split('_')[0];
                const args = interaction.customId.split('_').slice(1);
                const file = client.interactions.get(name);

                if (!file) return;

                const member = interaction.member as GuildMember | null;
                if (
                    member &&
                    file.permission &&
                    !member.permissions.has(
                        new PermissionsBitField(file.permission)
                    )
                ) {
                    return await interaction.reply({
                        content:
                            "You don't have permission to use this button.",
                        ephemeral: true
                    });
                }

                await file.run(interaction, ...args);
            }
        }
    }
};
