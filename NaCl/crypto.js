module.exports = class NaCl {
    constructor(client, key) {

    }

    generateHandshake() {
        return Uint8Array.from(Buffer.from("8f8579ce3e445b91a50bd2972a3b7ceb1423dbd2e3680d31392fa72aa3705b08", "hex"));
    }
}