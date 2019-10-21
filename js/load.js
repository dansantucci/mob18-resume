const load = () => {
    let d = document;
    let personalTabs = d.querySelectorAll('.personalinfo-tab');
    let contentBlocks = d.querySelectorAll('.personalinfo-block');
    let sendButton = d.querySelector(".form-send");
    let removeActive = () => {
        personalTabs.forEach((elem) => {
            elem.className = elem.className.split('active').join('').trim();
        });
    };
    let setActiveBlock = (blockType) => {
        contentBlocks.forEach((elem) => {
            let type = elem.getAttribute("data-block");
            if (type === blockType) {
                elem.className = elem.className.split('hide').join('').trim();
            } else {
                elem.className += ' hide';
            }
        });
    }

    personalTabs.forEach((elem, key) => {
        elem.addEventListener('click', () => {
            let blockType = elem.getAttribute("data-block");
            removeActive();
            elem.className += ' active';
            setActiveBlock(blockType);
        });
    });

    sendButton.addEventListener('click', () =>{ 
        let name = d.querySelector(".form-name").value;
        let subject = d.querySelector(".form-subject").value;
        let email = d.querySelector(".form-email").value;
        let message = d.querySelector(".form-message").value;

        const URL = "https://fiap-sender.herokuapp.com/email/send";
        let headers = new Headers();
        headers.append("Accept","*/*");
        headers.append("Content-Type","application/json");
        headers.append("accept-encoding","gzip,deflate");
        let config = {};
        config.method = "POST";
        config.headers = headers;
        config.mode = "cors";
        config.body = JSON.stringify({
            "from": name,
            "to": "dansantucci@live.com",
            "subject": subject,
            "text": `
                Name: ${name}

                Message: ${message}
            `
        });
        fetch(URL, config).then((response) => {
            if (response.status == 200) {
                alert("E-mail sent!");
            }
        });
    });
}



window.onload = function(){
    load();
}
