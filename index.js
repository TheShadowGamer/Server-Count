const { Plugin } = require('powercord/entities');
const { getModule } = require('powercord/webpack')
let result;

module.exports = class ServerCount extends Plugin {
    startPlugin () {
        powercord.api.commands.registerCommand({
            command: 'servercount',
            description: 'Tells you how many servers you are in.',
            usage: '{c}',
            executor: async () => {
                const { getGuilds } = await getModule([ 'getGuilds' ]);
                const number = await Object.keys(getGuilds()).length
                result = {
                    type: "rich",
                    title: "Server Count",
                    description: "You are in " + number.toString() + " servers."
                };
                return {
                    send: false,
                    result,
                };
            }
        })
    }
    pluginWillUnload () {
        powercord.api.commands.unregisterCommand('servercount');
    }
}