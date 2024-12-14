import { readdirSync } from 'fs';

import FastLogging from 'fastlogging';

const logger = new FastLogging(true, true);

export const loadCommands = (client: any) => {
    let count = 0;
    const dirsCommands = readdirSync('./src/commands');

    for (const dir of dirsCommands) {
        const filesDirs = readdirSync(`./src/commands/${dir}`).filter((file) =>
            file.endsWith('.ts')
        );

        for (const file of filesDirs) {
            const command = require(`../commands/${dir}/${file}`);
            client.commands.set(command.data.name, command);
            count++;
        }
    }

    logger.info(`[Commands] => ${count} commands loaded`);
};
