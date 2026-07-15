const PiranhaMessage = require("../../PiranhaMessage");

export function idToHighLow(id) {
  const bigId = BigInt(id);
  console.log({
    high: Number(bigId >> 32n),
    low: Number(bigId & 0xFFFFFFFFn)
  });
  return {
    high: Number(bigId >> 32n),
    low: Number(bigId & 0xFFFFFFFFn)
  };
}

class LoginOkMessage extends PiranhaMessage {
  constructor(client) {
    super();
    this.id = 20758;
    this.client = client;
    this.version = 1;
  }

  async encode() {
    let jsonid = idToHighLow(BigInt(14));

    this.writeInt(jsonid.high);
    this.writeInt(jsonid.low);
    this.writeInt(jsonid.high);
    this.writeInt(jsonid.low);

    this.writeString("TOKENTOKENTOKEN123");
    this.writeString("null");
    this.writeString("null");
    this.writeVInt(15);
    this.writeVInt(535);
    this.writeVInt(535);
    this.writeVInt(0);
    this.writeString("prod");
    this.writeVInt(10);
    this.writeVInt(10);
    this.writeVInt(10);
    this.writeString("1475268786112433");
    this.writeString("1783175464");
    this.writeString("1783175464");
    this.writeVInt(0);
    this.writeString("null");
    this.writeString("null");
    this.writeString("null");
    this.writeString("RU");
    this.writeVInt(1);
    this.writeVInt(0);
    this.writeVInt(0);
    this.writeVInt(2);
    this.writeString("https://yellowwarmsand.com/patch-cr");
    this.writeString("http://45.95.201.23/patch-cr");
    this.writeVInt(2);
    this.writeString('https://r-assets1.netlify.app/')
    this.writeString('https://r-assets1.netlify.app/')
    this.writeHex2("95000000789c15ca4b0e82301000d01349d20a159604084ca36d4489c2ce028933d61f4aa09cdef8d6af77f26af216354aa816600a65e4f54e3eea13b3404f6cb97286cf1fc009ebbb1d9b04445748d61c266c737bfb1fb5c4be3e6681a20ab789b47d11a3a66cadd39d5394f98acac843be7fbbc05c46fe1569c88660e1e7695e812bd3e13502995c74512728dcc00ffabd3225");
    this.writeBoolean(false);
    this.writeBoolean(false);
    this.writeBoolean(false);
    this.writeVInt(0);
    this.writeStringReference("");
    this.writeString("null");
    this.writeBoolean(false);
    this.writeBoolean(false);
    this.writeBoolean(false);
    this.writeBoolean(false);
    this.writeBoolean(false);
    this.writeBoolean(false);
    this.writeBoolean(false);
    this.writeBoolean(false);
    this.writeBoolean(false);
  }
}

module.exports = LoginOkMessage;
