const imagekit=require('@imagekit/nodejs');


const imagekitclient=new imagekit({
    privatekey:process.env.IMAGEKIT_PRIVATE_KEY,
})

async function uploadfile(file){
    const result=await imagekitclient.files.upload({
        file,
        fileName:"music_"+Date.now(),
        folder:"spotify/music"
    })

    return result
}


module.exports={uploadfile}