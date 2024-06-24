import { Channel, Guild } from 'discord.js'

interface IChannel {
    // Channel id
    id: String
    // Channel name
    name: String
    // Channel type : accessible via ChannelType[interaction.type]
    type: Number
    // Guild object
    guild: Guild
    // Parent id (category id)
    parentId?: string
    // Channel topic
    topic: String
    // NSFW status
    nsfw: Boolean
}

export type ICustomChannel = Channel & IChannel
