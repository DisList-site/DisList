const { Command } = require("../../structures");
const botModel = require("../../db/models/Bot");
const { MessageEmbed } = require("discord.js");

module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "botinfo",
                description: "See information of a specific bot.",
                usage: "[@mention / bot id]",
                aliases: ["bi"],
                disabled: false,
                category: "Bot reviewer",
            },
            client
        );
    }

    async execute({ message, args }) {
        const bot = await this.client.util.userFromMentionOrId(args[0]);
        if (!bot)
            return message.reply("Please mention a bot to get it's info!");
        if (!bot.bot) return message.reply("That is not a real bot!");
        const botDB = await botModel.findOne({ botId: bot.id });
        if (!botDB) return message.channel.send(
          "That bot is not added or is rejected!"
      );
        const embed = new MessageEmbed()
            .setColor("BLUE")
            .addField("Name", bot.username, true)
            .addField("ID", bot.id, true)
            .addField("Status", botDB.approved ? "Approved" : "Not approved", true)
            .addField("Prefix", botDB.prefix, true)
            .addField("About", botDB.descriptions.short, true)
            .addField(
                "Statistics",
                `**${botDB.stats?.shardCount ? "Shard" : "Server"} count:** ${
                    botDB.stats?.shardCount ?? botDB.stats.serverCount
                }\n**Votes:** ${botDB.analytics.votes}`,
                true
            )
            .addField(
                "Links",
                `[Invite](https://discord.com/oauth2/authorize?client_id=${bot.id}&scope=bot%20applications.commands&permissions=8) ${botDB.website ? `| [Website](${botDB.website})` : ""} ${botDB.support ? `| [Support](${botDB.support})` : ""} ${botDB.github ? `| [GitHub](${botDB.github})` : ""}`,
                true
            )
            .addField("Owner", `<@${botDB.owner}>`, true);
        message.channel.send({ embeds: [embed] });
    }
};
