require("dotenv").config();

const ImageKit = require("@imagekit/nodejs");
const fs = require("fs");

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function test() {
    try {
        console.log("KEY EXISTS:", !!process.env.IMAGEKIT_PRIVATE_KEY);
        console.log("Starting ImageKit test...");

        const result = await client.files.upload({
            file: fs.createReadStream("./test.txt"),
            fileName: `test_${Date.now()}.txt`,
            folder: "spotify/test"
        });

        console.log("SUCCESS");
        console.log(result);

    } catch (error) {
        console.error("IMAGEKIT ERROR");
        console.error(error);
        console.error("MESSAGE:", error.message);
        console.error("STACK:", error.stack);
    }
}

test();