class LogicChangeAvatarNameCommand {
  constructor(client) {
    this.client = client
  }

  async decode (buffer) {}

  async encode (self, Name) {
    self.writeString(Name) // Name
    self.writeInt(0) // NameSet
    console.log(Name)
  }
}

module.exports.configureClient = LogicChangeAvatarNameCommand