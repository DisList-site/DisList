/**
 * Discord Welcome-Bot
 * Copyright (c) 2021 The Welcome-Bot Team and Contributors
 * Licensed under Lesser General Public License v2.1 (LGPl-2.1 - https://opensource.org/licenses/lgpl-2.1.php)
 */
const models = require("fs")
    .readdirSync(__dirname)
    .filter((file) => file !== "index.js" && file.endsWith(".js"));

const files = models.map((file) => require(`${__dirname}/${file}`));

const all = {};
for (let i = 0; i < models.length; i++) {
    all[models[i].replace(".js", "")] = files[i];
}
module.exports = all;
