import {
    Events,
    EmbedBuilder,
    TextChannel,
    GuildMember,
} from 'discord.js';

import { parse } from '@/utils/json';
import { CustomClient } from '@/base/classes/CustomClient';

const jsonPath = './data/log.json';

const embed = new EmbedBuilder()
    .setTitle('Member Update')
    .setColor('#00FF00')
    .setTimestamp();

module.exports = {
    name: Events.GuildMemberUpdate,

    async run(client: CustomClient, oldMember: GuildMember, newMember: GuildMember) {
        
        const guildId = newMember.guild?.id;
        const data = parse(jsonPath, []);
        const guildData = data.find((data: any) => data.guildId === guildId);

        if (!guildData) {
            return;
        }

        const logChannel = newMember.guild?.channels.cache.get(
            guildData.logChannelId
        ) as TextChannel;

        if (!logChannel) {
            return;
        }

        let changes = '';

        if (oldMember.nickname !== newMember.nickname) {
            changes += `**Nickname:** ${oldMember.nickname} -> ${newMember.nickname}\n`;
        }

        if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
            const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
            const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

            if (addedRoles.size > 0) {
                changes += `**Roles Added:** ${addedRoles.map(role => role.name).join(', ')}\n`;
            }

            if (removedRoles.size > 0) {
                changes += `**Roles Removed:** ${removedRoles.map(role => role.name).join(', ')}\n`;
            }
        }

        if (oldMember.user.username !== newMember.user.username) {
            changes += `**Username:** ${oldMember.user.username} -> ${newMember.user.username}\n`;
        }

        if (oldMember.user.discriminator !== newMember.user.discriminator) {
            changes += `**Discriminator:** ${oldMember.user.discriminator} -> ${newMember.user.discriminator}\n`;
        }

        if (oldMember.user.avatar !== newMember.user.avatar) {
            const oldAvatarURL = oldMember.user.avatar 
                ? `https://cdn.discordapp.com/avatars/${oldMember.user.id}/${oldMember.user.avatar}.png?size=1024` 
                : 'URL de l\'image par défaut';
            const newAvatarURL = newMember.user.avatar 
                ? `https://cdn.discordapp.com/avatars/${newMember.user.id}/${newMember.user.avatar}.png?size=1024` 
                : 'URL de l\'image par défaut';
            embed.addFields(
                { name: 'Old', value: `[Lien](${oldAvatarURL})`, inline: true },
                { name: 'New', value: `[Lien](${newAvatarURL})`, inline: true }
            )
        }

        embed.setDescription(`
            A member has been updated.
            > **Member:** <@${newMember.id}>
            
            __**Changes:**__
            ${changes}
        `).setThumbnail(newMember.user.displayAvatarURL());


        return await logChannel.send({ embeds: [embed] });
    }
};
