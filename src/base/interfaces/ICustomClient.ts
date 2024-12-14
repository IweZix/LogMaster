import { Client, Collection } from 'discord.js';

import { ICommand } from '@/base/interfaces/ICommand';

/**
 * Custom client interface
 */
export interface ICustomClient extends Client {
    commands: Collection<string, ICommand>;
    interactions: Collection<string, ICommand>;

    /**
     * Start the client
     * @returns {Promise<void>}
     */
    start: () => Promise<void>;
}
