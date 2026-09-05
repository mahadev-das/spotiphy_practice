const imagekit=require('@imagekit/nodejs');
const path=require('path')

const imagekitclient = new imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadfile(file){
    const extension = path.extname(file.originalname);

    const result=await imagekitclient.files.upload({
        file:file.toString('base64'),
        fileName: `music_${Date.now()}${extension}`,
        folder:"spotify/music"
    })
    return result
}
module.exports={uploadfile};