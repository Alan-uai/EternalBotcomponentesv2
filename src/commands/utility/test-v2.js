// src/commands/utility/test-v2.js
import { createContainer } from '@magicyan/discord';
import {
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('test-v2')
    .setDescription('Testa o envio de componentes avançados com @magicyan/discord.')
    .setDefaultMemberPermissions(0); // Admin only

export async function execute(interaction) {
    try {
        const container = createContainer({
            embeds: [{
                title: 'Teste de Componentes com @magicyan/discord',
                description: 'Esta mensagem demonstra a estrutura criada com `createContainer`.',
                color: 0x8CBF92 // Verde claro
            }],
            components: [
                // Seção com botão como acessório
                {
                    type: 'section',
                    accessory: new ButtonBuilder()
                        .setStyle(ButtonStyle.Secondary)
                        .setLabel("Botão Acessório")
                        .setCustomId("v2_accessory_button"),
                    text: {
                        main: '**Seção com Acessório**',
                        secondary: 'Este é um texto secundário na seção.'
                    }
                },
                // Botões normais
                {
                    type: 'buttons',
                    components: [
                        new ButtonBuilder()
                            .setStyle(ButtonStyle.Link)
                            .setLabel("Link Externo")
                            .setURL("https://discord.js.org/"),
                        new ButtonBuilder()
                            .setStyle(ButtonStyle.Primary)
                            .setLabel("Botão Primário")
                            .setCustomId("v2_primary_button"),
                    ]
                },
                // Seção com menu de seleção
                {
                    type: 'section',
                    text: {
                        main: '**Menu de Seleção**',
                        secondary: 'Selecione uma ou mais opções abaixo.'
                    },
                    selectMenu: new StringSelectMenuBuilder()
                        .setCustomId("v2_select_menu")
                        .setPlaceholder("Escolha uma opção...")
                        .setMaxValues(2)
                        .addOptions(
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Opção A")
                                .setValue("option_a")
                                .setDescription("Descrição da Opção A")
                                .setEmoji({ name: "🇦" }),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Opção B")
                                .setValue("option_b")
                                .setDescription("Descrição da Opção B")
                                .setEmoji({ name: "🇧" }),
                        ),
                },
                // Galeria de Mídia
                {
                    type: 'section',
                    text: { main: '**Galeria de Mídia**' }
                },
                {
                    type: 'gallery',
                    images: [
                        "https://i.imgur.com/AfFp7pu.png", // Logo Discord.js
                        "https://i.imgur.com/r3tG6s5.png"  // Outro logo
                    ]
                },
                // Separador
                {
                    type: 'separator'
                },
                {
                    type: 'section',
                    text: { main: 'Fim do teste.' }
                }
            ]
        });

        await interaction.reply(container);

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
