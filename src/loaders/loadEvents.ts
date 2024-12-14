import { readdirSync } from 'fs';

import FastLogging from 'fastlogging';
import { ICustomClient } from '@/base/interfaces/ICustomClient';

const logger = new FastLogging(true, true);

export const loadEvents = (client: ICustomClient) => {
    let count = 0;
    const dirsEvents = readdirSync('./src/events');

    for (const dir of dirsEvents) {
        const filesDirs = readdirSync(`./src/events/${dir}`).filter((file) =>
            file.endsWith('.ts')
        );

        for (const file of filesDirs) {
            const event = require(`../events/${dir}/${file}`);
            client.on(event.name, event.run.bind(null, client));
            count++;
        }
    }

    logger.info(`[Events] => ${count} events loaded`);
};
