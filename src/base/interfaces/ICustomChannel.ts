import { Channel, Guild } from 'discord.js';

/**
 * Interface for the channel
 */
interface IChannel {
    // Channel id
    id: String;
    // Channel Id (only for voice channels)
    channelId: Number;
    // Channel name
    name: String;
    // Channel type : accessible via ChannelType[interaction.type]
    type: Number;
    // Guild object
    guild: Guild;
    // Parent id (category id)
    parentId?: string;
    // Channel topic
    topic: String;
    // NSFW status
    nsfw: Boolean;
}

/**
 * Custom channel interface
 */
export type ICustomChannel = Channel & IChannel;
