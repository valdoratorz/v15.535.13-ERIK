class SwapSpellsCommand {
  constructor(client) {
    this.client = client;
  }

  async decode (buffer) {
    //86 02 80 80 c8 07 01 81 0d 85 02 85 02 00 b6 c6 c6 43 01 8c ba 9f 02 7f 7f 80 fa 8f a2 01 7f ff ff ff ff

    buffer.readByte();// 1: 0xa1
    buffer.readByte();// 2: 0x4
    buffer.readByte();// 3: 0xa1
    buffer.readByte();// 4: 0x4
    buffer.readVInt();
    buffer.readVInt();
    this.card = buffer.readInt();
    this.positionIndex = buffer.readByte();// 14: 0x2
    buffer.readByte();//
    buffer.readByte();// 
    buffer.readByte();// 
    buffer.readByte();// 
    buffer.readByte();// 

    console.log('Card:', this.card, 'Position:', this.positionIndex);
    console.log('hex:', buffer.getHex());
  }

  async encode () {
    
  }
}

module.exports.configureClient = SwapSpellsCommand