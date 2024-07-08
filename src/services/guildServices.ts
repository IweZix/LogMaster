import { parse } from '@/utils/json';
import { Guild, GuildMember, TextChannel } from 'discord.js';

const jsonPath = './data/log.json';

/**
 * Get the log channel of a guild
 * @param {any} any - The object to get the log channel from
 * @returns {TextChannel | null} The log channel of the guild
 */
export const getLogChannel = (guild: Guild): TextChannel | null => {
    const guildId = guild.id;
    const data = parse(jsonPath, []);
    const guildData = data.find((data: any) => data.guildId === guildId);

    if (!guildData) {
        return null;
    }

    const logChannel = guild.channels.cache.get(
        guildData.logChannelId
    ) as TextChannel;

    if (!logChannel) {
        return null;
    }

    return logChannel;
};

/**
 * Get the executor of a guild
 * @param {any} any - The object to get the executor from
 * @returns {Promise<GuildMember>} The executor of the guild
 */
export const getExecutor = async (any: any): Promise<GuildMember> => {
    const logs = (await any
        .fetchAuditLogs({ type: 12 })
        .then((audit: { entries: { first: () => any } }) =>
            audit.entries.first()
        )) || { executor: null };
    return logs.executor;
};

export const getExecutorById = async (guild: Guild, id: string): Promise<GuildMember> => {
    return await guild.members.fetch({ user: id });
}
