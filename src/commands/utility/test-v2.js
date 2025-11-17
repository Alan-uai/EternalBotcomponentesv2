// src/commands/utility/test-v2.js
import '@magicyan/discord';
import {
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    SeparatorBuilder,
    ActionRowBuilder,
    TextDisplayBuilder
} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('test-v2')
    .setDescription('Testa o envio de componentes avançados com @magicyan/discord.')
    .setDefaultMemberPermissions(0); // Admin only

export async function execute(interaction) {
    try {
            
        const row = new ActionRowBuilder<ButtonBuilder>({
            components: [
                new ButtonBuilder({
                    customId: 'but1',
                    label: 'azi',
                    style: ButtonStyle.Secondary
                }),
            ]
        });

        const text = new TextDisplayBuilder({
            content: 'test'
        });

        await interaction.reply({
            flags: ["Ephemeral", "IsComponentsV2"],
            content: 'Componentes enviados com sucesso!',
            components: [
                row,
                text,
            ]
        })

    } catch (error) {
        console.error('Erro ao executar o comando /test-v2:', error);
        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({
                content: 'Ocorreu um erro ao tentar enviar os componentes. Verifique os logs.',
                ephemeral: true
            });
        }
    }
}
