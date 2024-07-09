import { CustomClient } from "@/base/classes/CustomClient";
import { ICustomChannel } from "@/base/interfaces/ICustomChannel";
import { Channel, Events, Guild, TextChannel } from "discord.js";

module.exports = {
    name: Events.GuildCreate,

    /**
     * Run the event
     * @param {CustomClient} client The client  
     * @param {Guild} guild The guild 
     */
    async run(client: CustomClient, guild: Guild) {
        
        const channelId: string = '';
        const channel: TextChannel | undefined = client.channels.cache.get(channelId) as TextChannel;

        if (!channel) {
            return;
        }

        return channel.send(`\`\`${client.user?.username ?? 'Unknown'}\`\` has joined \`\`${guild.name}\`\`-\`\`${guild.id}\`\``);
    }
}