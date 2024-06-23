import { Interaction } from 'discord.js'

interface ICustomChannelInteraction {
    // Channel id
    id: String
    // Channel name
    name: String
    // Channel type : accessible via ChannelType[interaction.type]
    type: Number
    // Guild object
    guild: Object
    // Parent id (category id)
    parentId?: string
}

export type ExtendedChannelInteraction = Interaction & ICustomChannelInteraction
