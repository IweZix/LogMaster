import {
    ChatInputCommandInteraction,
    PermissionsString,
    ButtonInteraction
} from 'discord.js';

/**
 * Command interface
 */
export interface ICommand {
    permission: PermissionsString;
    data: {
        name: string;
        description: string;
        default_member_permissions?: bigint;
    };

    /**
     * Run the interaction
     * @param {ChatInputCommandInteraction | ButtonInteraction} interaction The interaction
     * @param {any[]} args The arguments
     * @returns {Promise<void>} Send a message in the log channel
     */
    run: (
        interaction: ChatInputCommandInteraction | ButtonInteraction,
        ...args: any[]
    ) => Promise<void>;
}
