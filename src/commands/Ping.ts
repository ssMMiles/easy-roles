import {
  ActionRowBuilder,
  Button,
  ButtonBuilder,
  ButtonContext,
  EmbedBuilder,
  ISlashCommand,
  MessageBuilder,
  SlashCommandBuilder,
  SlashCommandContext
} from "interactions.ts";

type State = {
  ping: boolean;
};

export class Ping implements ISlashCommand {
  public builder = new SlashCommandBuilder("ping", "Simple ping command.");

  public handler = async (ctx: SlashCommandContext): Promise<void> => {
    return ctx.reply(
      new MessageBuilder(new EmbedBuilder("Pong!")).addComponents(
        new ActionRowBuilder([await ctx.createComponent("pong", { ping: false })])
      )
    );
  };

  public components = [
    new Button(
      "pong",
      new ButtonBuilder().setEmoji({ name: "🏓" }).setStyle(1),
      async (ctx: ButtonContext<State>): Promise<void> => {
        if (!ctx.state) return ctx.defer();

        ctx.reply(
          new MessageBuilder(new EmbedBuilder().setTitle(ctx.state.ping ? "Pong!" : "Ping!")).addComponents(
            new ActionRowBuilder([await ctx.createComponent("pong", { ping: !ctx.state.ping })])
          )
        );
      }
    )
  ];
}
