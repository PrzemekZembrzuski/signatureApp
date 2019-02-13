const signatureUpdate = require('./modules/signatureUpdate.js');
const path = require('path');

const rootPath = 'C:/stopka';
const input = document.querySelector('#capitalInput');
const button = document.querySelector('#container > button');
const showEmoji = (type)=>{
    const emojiImg = document.querySelector('img.emoji');
    const emojiPath = path.join(__dirname,'public','images',`${type}.png`);
    emojiImg.src = emojiPath;
    emojiImg.alt = type
    emojiImg.classList.add('visible');
    setTimeout(()=>{
        emojiImg.classList.remove('visible');
    },3000)
}
const changeAction = ()=>{
    if(input.value && !isNaN(input.value.replace(/\./g,''))){
        signatureUpdate(input.value,rootPath,(err)=>{
            if(err){
                console.log(err)
                showEmoji('sad')
            }
            else{
                showEmoji('happy');
            }
            input.value = ""
        })
    }
}
document.addEventListener('keydown',e=>{
    if(e.keyCode === 13){
        changeAction()
    }
})
button.addEventListener('click',()=>{
    changeAction()
})
const formatNumber = (numberText)=>{
    return numberText.toString()
    .split("")
    .reverse()
    .join("")
    .replace(/\./g,'')
    .replace(/(\d{3})(?=\d)/g, "$1.")
    .split("")
    .reverse()
    .join("")
}
input.addEventListener('keyup',e=>{
    e.target.value = formatNumber(e.target.value)
})