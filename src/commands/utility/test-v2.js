// src/commands/utility/test-v2.js
import {
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    SeparatorBuilder,
    SeparatorSpacingSize,
    ActionRowBuilder,
    TextDisplayBuilder,
    ContainerBuilder,
    SectionBuilder,
    ThumbnailBuilder,
    FileBuilder,
    MediaGalleryBuilder,
    MediaGalleryItemBuilder,
    MessageFlags
} from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('test-v2')
    .setDescription('Testa o envio de componentes V2.')
    .setDefaultMemberPermissions(0); // Admin only

export async function execute(interaction) {
    try {
        const componentsV2 = [
            new ContainerBuilder()
                .setAccentColor(9225410)
                .addSectionComponents(
                    new SectionBuilder()
                        .setButtonAccessory(
                            new ButtonBuilder()
                                .setStyle(ButtonStyle.Secondary)
                                .setLabel("Herbivorous Mongoose")
                                .setCustomId("f6129ddb91b6464af7f7a2fa924fb7d6")
                        )
                        .addTextDisplayComponents(
                            new TextDisplayBuilder().setContent("Example components:"),
                        ),
                )
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent("\nButtons"),
                )
                .addComponents( // Usando addComponents diretamente
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel("Buttons that")
                        .setURL("https://google.com"),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Primary)
                        .setLabel("you can")
                        .setCustomId("36acfad8d418474084daed1d0d06bef2"),
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Secondary)
                        .setLabel("drag around")
                        .setCustomId("212dc1a845d54912cdff8446cdb3d321"),
                )
                .addSectionComponents(
                    new SectionBuilder()
                        .setButtonAccessory(
                            new ButtonBuilder()
                                .setStyle(ButtonStyle.Link)
                                .setLabel("Cute Octopus")
                                .setURL("https://google.com")
                        )
                        .addTextDisplayComponents(
                            new TextDisplayBuilder().setContent("\nSelect menus"),
                            new TextDisplayBuilder().setContent("Always scream into the void before you sing opera."),
                        ),
                )
                .addComponents( // Usando addComponents diretamente
                    new StringSelectMenuBuilder()
                        .setCustomId("99fca274f90a4070beb7086fdf335bfc")
                        .setMaxValues(3)
                        .addOptions(
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Test selection")
                                .setValue("44c530edcff948c5e63764303419e252")
                                .setDescription("test")
                                .setDefault(true),
                            new StringSelectMenuOptionBuilder()
                                .setLabel("Other selection")
                                .setValue("c0f60f084fc44e99ec904a89f83ffaf6"),
                        ),
                )
                .addSectionComponents(
                    new SectionBuilder()
                        .setThumbnailAccessory(
                            new ThumbnailBuilder()
                                .setURL("https://avatars.githubusercontent.com/u/77593673?s=128")
                        )
                        .addTextDisplayComponents(
                            new TextDisplayBuilder().setContent("\nFiles"),
                            new TextDisplayBuilder().setContent("Behind every alien, there's a awkward invisible unicorn."),
                        ),
                )
                .addFileComponents(
                    new FileBuilder().setURL("attachment://secret-file.pdf"),
                )
                .addTextDisplayComponents(
                    new TextDisplayBuilder().setContent("\nImages"),
                )
                .addMediaGalleryComponents(
                    new MediaGalleryBuilder()
                        .addItems(
                            new MediaGalleryItemBuilder()
                                .setURL("https://avatars.githubusercontent.com/u/77593673?s=128"),
                        ),
                )
                .addSeparatorComponents(
                    new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small).setDivider(true),
                )
                .addSectionComponents(
                    new SectionBuilder()
                        .setThumbnailAccessory(
                            new ThumbnailBuilder()
                                .setURL("https://avatars.githubusercontent.com/u/77593673?s=128")
                        )
                        .addTextDisplayComponents(
                            new TextDisplayBuilder().setContent("If life gives you giant spaghetti, make emotional potato soup."),
                            new TextDisplayBuilder().setContent("Behind every robot, there's a jealous invisible unicorn."),
                        ),
                ),
        ];

        await interaction.reply({
            content: 'Componentes V2 enviados com sucesso!',
            flags: [MessageFlags.IsComponentV2, MessageFlags.SuppressEmbeds],
            components: componentsV2,
        });

    } catch (error) {
        console.error('Erro ao executar o comando /test-v2:', error);
        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({
                content: 'Ocorreu um erro ao tentar enviar os componentes V2. Verifique os logs.',
                ephemeral: true
            });
        }
    }
}
