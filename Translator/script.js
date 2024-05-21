
document.getElementById('input').addEventListener("keyup", function() {
    console.log('change');
    var inputValue = document.getElementById('input').value;
    translate(inputValue);
    resizeInput();
    resizeTranslation();
});

// On click on text area, select copy the text 
document.getElementById('copy').addEventListener("click", function() {
    var copyText = document.getElementById('translation');
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand('copy');
    // unselect the text
    window.getSelection().removeAllRanges();
} );

// Function that takes a parameter
function translate(value) {
    // get selected option
    var language = document.getElementById('language').value;
    switch(language) {
        case 'aurebesh':
            var translated = translateToAurebesh(value);
            break;
        case 'binary':
            var translated = translateToBinary(value);
            break;
        case 'hexadecimal':
            var translated = translateToHexadecimal(value);
            break;
        case 'elvish':
            var translated = translateToElvish(value);
            break;
        default:
            var translated = value;
    }
    // Display the translation
    console.log(translated);
    document.getElementById('translation').innerHTML = translated;
}


function translateToAurebesh(value) {
    var translation = value;
    // change css of translation
    document.getElementById('translation').style.fontFamily = 'Aurebesh';
    return translation;
}

function translateToBinary(value) {
    var translation = '';
    for (var i = 0; i < value.length; i++) {
        translation += value[i].charCodeAt(0).toString(2) + ' ';
    }
    // change css of translation
    document.getElementById('translation').style.fontFamily = 'monospace';
    return translation;
}

function translateToElvish(value) {
    var translation = value;
    // change css of translation
    document.getElementById('translation').style.fontFamily = 'Elvish';
    return translation;
}

// resizes the input field if overflow
function resizeInput() {
    var input = document.getElementById('input');
    input.style.width = 'auto';
    input.style.width = (input.scrollWidth) + 'px';
}

function resizeTranslation() {
    var translation = document.getElementById('translation');
    //height = nb lines * line height + padding
    translation.style.height = 'auto';
    translation.style.height = (translation.scrollHeight) + 'px';

}


