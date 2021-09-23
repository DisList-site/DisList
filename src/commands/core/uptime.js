const moment = require("moment");
require("moment-duration-format");
const { Command } = require("../../structures");
const { MessageEmbed } = require("discord.js");
module.exports = class CMD extends Command {
    constructor(client) {
        super(
            {
                name: "uptime",
                aliases: ["bot-uptime"],
                disabled: false,
                category: "Core",
            },
            client
        );
    }

    execute({ message }) {
        const duration = moment
            .duration(message.client.uptime)
            .format(" D [days], H [hours], m [minutes], s [seconds]");
        const date = new Date();
        const timestamp = date.getTime() - Math.floor(message.client.uptime);
        const embed = new MessageEmbed()
            .setTitle(`:hourglass_flowing_sand:`)
            .addField(
                `Uptime`,
                `\`\`\`${duration}\`\`\``
            )
            .addField(
                "Date launched",
                `\`\`\`${moment(timestamp).format("LLLL")}\`\`\``
            )
            .setColor("GREEN")
            .setTimestamp();
        message.channel.send({
            embeds: [embed],
        });
    }
};