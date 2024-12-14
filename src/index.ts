import { IntentsBitField } from 'discord.js';

import { ICustomClient } from './base/interfaces/ICustomClient';
import { CustomClient } from './base/classes/CustomClient';

const client: ICustomClient = new CustomClient({
    intents: new IntentsBitField(3276799)
}) as ICustomClient;

client.start();
