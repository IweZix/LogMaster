import { readdirSync } from 'fs';

import { ICustomClient } from '@/base/interfaces/ICustomClient';
import FastLogging from 'fastlogging';

const logger = new FastLogging(true, true);

export const loadInteractions = (client: ICustomClient) => {
    let count = 0;
    const dirsInteractions = readdirSync('./src/interactions');

    for (const dir of dirsInteractions) {
        const filesDirs = readdirSync(`./src/interactions/${dir}`).filter(
            (file) => file.endsWith('.ts')
        );

        for (const file of filesDirs) {
            const interaction = require(`../interactions/${dir}/${file}`);
            client.interactions.set(interaction.name, interaction);
            count++;
        }
    }

    logger.info(`[Interactions] => ${count} interactions loaded`);
};
