class StartBattleCommand {
  constructor(client) {
    this.client = client;
  }

  async decode (buffer) {
    let gameMode = buffer.readVInt();
  }

  async process () {
    
  }
}

module.exports.configureClient = StartBattleCommand