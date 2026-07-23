const fs = require('fs')
const spinner = require('../Utils/json/spinner');
const LogicChangeAvatarNameCommand = require("./Commands/Server/LogicChangeAvatarNameCommand");

class MessageFactory {
  constructor () {
    this.packets = {}

    fs.readdir('./Protocol/Messages/Client', (err, files) => {
      if (err)console.log(err)
      files.forEach(e => {
        try{
          const Packet = require(`./Messages/Client/${e.replace('.js', '')}`)
          const packetClass = new Packet()

          this.packets[packetClass.id] = Packet
        }catch(err){
          console.log(`[SERVER] >> A wild error while initializing "${e.replace(".js", "")}" packet!`)
          console.log(err)
        }
      })
    })
  }

  handle (id) {
    return this.packets[id]
  };

  getPackets () {
    return Object.keys(this.packets)
  }
}

console.clear();

//cmds
//LogicChangeAvatarNameCommand.configureClient(); //name changing is now a regular message

module.exports = MessageFactory