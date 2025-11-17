// src/commands/utility/test-v2.js
import {
    SlashCommandBuilder,
    TextDisplayBuilder,
    ButtonBuilder,
    ButtonStyle,
    SectionBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ThumbnailBuilder,
    FileBuilder,
    MediaGalleryBuilder,
    MediaGalleryItemBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    ContainerBuilder,
    MessageFlags,
} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('test-v2')
    .setDescription('Testa o envio de componentes V2 avançados.')
    .setDefaultMemberPermissions(0); // Admin only

export async function execute(interaction) {
    try {
        const componentsV2 = [
            new ContainerBuilder()
                .setAccentColor(0x8CBF92) // Verde claro
                .addSectionComponents(
                    new SectionBuilder()
                        .setButtonAccessory(
                            new ButtonBuilder()
                                .setStyle(ButtonStyle.Secondary)
                                .setLabel("Acessório de Botão")
                                .setCustomId("v2_accessory_button")
                        )
                        .addTextDisplayComponents(
                            new TextDisplayBuilder().setContent("**Componentes V2 - Teste Prático**"),
                        ),
                )
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent("\nBotões Padrão:"),
                )
                .addButtonComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("Link Externo")
                        .setURL("https://discord.js.org/"),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Primary)
                        .setLabel("Botão Primário")
                        .setCustomId("v2_primary_button"),
                )
                .addSectionComponents(
                    new SectionBuilder()
                        .setThumbnailAccessory(
                            new ThumbnailBuilder()
                                .setURL("https://i.imgur.com/AfFp7pu.png") // Ícone do Discord.js
                        )
                        .addTextDisplayComponents(
                            new TextDisplayBuilder().setContent("\nMenus de Seleção:"),
                            new TextDisplayBuilder().setContent("Selecione uma ou mais opções."),
                        ),
                )
                .addStringSelectMenuComponents(
                    new StringSelectMenuBuilder()
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
                )
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent("\nGaleria de Mídia:"),
                )
                .addMediaGalleryComponents(
                    new MediaGalleryBuilder()
                        .addItems(
                            new MediaGalleryItemBuilder()
                                .setURL("https://i.imgur.com/AfFp7pu.png"), // Logo 1
                            new MediaGalleryItemBuilder()
                                .setURL("https://i.imgur.com/r3tG6s5.png"), // Logo 2
                        ),
                )
                .addSeparatorComponents(
                    new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
                )
                 .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent("Fim do teste."),
                ),
        ];

        await interaction.reply({
            flags: [MessageFlags.SuppressEmbeds],
            components: componentsV2,
        });

    } catch (error) {
        console.error('Erro ao executar o comando /test-v2:', error);
        if (!interaction.replied) {
            await interaction.reply({
                content: 'Ocorreu um erro ao tentar enviar os componentes V2. Verifique os logs.',
                ephemeral: true
            });
        }
    }
}
