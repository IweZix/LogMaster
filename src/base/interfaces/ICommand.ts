import {
    ChatInputCommandInteraction,
    PermissionsString,
    ButtonInteraction
} from 'discord.js';

export interface ICommand {
    permission: PermissionsString;
    data: {
        name: string;
        description: string;
        default_member_permissions?: bigint;
    };

    run: (
        interaction: ChatInputCommandInteraction | ButtonInteraction,
        ...args: any[]
    ) => Promise<void>;
}
