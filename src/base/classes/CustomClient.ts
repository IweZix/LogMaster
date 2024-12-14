import { Client, Collection } from 'discord.js';

import { config } from '@/config';
import { ICustomClient } from '@/base/interfaces/ICustomClient';
import { ICommand } from '@/base/interfaces/ICommand';
import { loadCommands } from '@/loaders/loadCommands';
import { loadInteractions } from '@/loaders/loadInteractions';
import { loadEvents } from '@/loaders/loadEvents';

export class CustomClient extends Client implements ICustomClient {
    commands: Collection<string, ICommand>;
    interactions: Collection<string, ICommand>;

    constructor(options: ConstructorParameters<typeof Client>[0]) {
        super(options);
        this.commands = new Collection();
        this.interactions = new Collection();
    }

    async start() {
        loadCommands(this);
        loadEvents(this);
        loadInteractions(this);

        await this.login(config.token);
    }
}
