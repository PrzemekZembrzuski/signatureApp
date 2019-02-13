const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const regex = /stopka/i;

const signatureUpdate = (capital,rootPath,callback) => {
    fs.readdir(rootPath,(err,elements)=>{
        if(err){
            callback(err)
            return
        }
        elements.forEach(element => {
            const elementPath = path.join(rootPath, element);
            if (fs.lstatSync(elementPath).isDirectory()) {
                signatureUpdate(capital,elementPath,callback)
            } 
            else if (fs.lstatSync(elementPath).isFile() && regex.test(element)) {
                fs.readFile(elementPath,'utf8',(err,data)=>{
                    if(err){
                        callback(err);
                        return
                    }
                    const $ = cheerio.load(data);
                    $('span#capital').text(capital);
                    fs.writeFile(elementPath,$.html(),(err)=>{
                        if(err){
                            callback(err);
                        }
                    })
                })
            }
        })
    })

    callback()
}

module.exports = signatureUpdate