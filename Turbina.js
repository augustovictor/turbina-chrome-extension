var base_url = "https://demodev.icolabora.com.br/#processinstances/";

function sendToTurbinaPage() {
    chrome.tabs.executeScript(null, {
        code: `
            var processInstanceInput = document.getElementById('process-instance-input');
            console.log(document);
            // var url = 'http://demodev.icolabora.com.br/#processinstances/' + processInstanceInput.value;
            // var win = window.open(url, '_blank');
            // win.focus();
        `
    });
    // window.close()
}

document.addEventListener('DOMContentLoaded', function() {
    // var processInstanceInput = document.getElementById('process-instance-input');
    var processInstanceBtn = document.getElementById('go-process-instance');

    processInstanceBtn.addEventListener('click', function() {
        chrome.tabs.executeScript(null, {
            code: `
                console.log('foi');
                var processInstanceInput = document.getElementById('process-instance-input');
                console.log(processInstanceInput.value);
            
            `
        })

    });


    // var goButtons = document.querySelectorAll('button');
    // for(var i = 0; i < goButtons.length; i++) {
    //     goButtons[i].addEventListener('click', sendToTurbinaPage);
    // }
});