const linkInput = document.getElementById("linkInput");
const submitBtn = document.getElementById("submitBtn");
const resultContainer = document.querySelector(".resultContainer");

// event listeners

submitBtn.addEventListener("click", () => {
    while(resultContainer.firstChild){
        resultContainer.removeChild(resultContainer.firstChild);
    }
    
    const inputText = linkInput.value.trim();
    
    if (inputText != "") {
        let qrcode = new QRCode(resultContainer, {
            text: inputText,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff"
        });

        // let qrcodeIMG = resultContainer.querySelector("img");
        
        // Create a download link for the QRCode image and append it as a child of result container.
        // Firstly, get QRCode image source and set it as hyper link reference of download link.
        getQRCodeImgSource(resultContainer)
            .then(imgSrc => { return createQRCodeDownloadLink(imgSrc, resultContainer); })
            .then(qrcodeImgDownloadLink => {
                const downloadFileIcon = document.createElement("img");
                downloadFileIcon.src = "./assets/icons/download_file_icon.png";
                // downloadFileIcon.src = "./download1.png";
                qrcodeImgDownloadLink.appendChild(downloadFileIcon);
            });

    } else {
        linkInput.classList.add("error-input");
    } 
});

linkInput.addEventListener("focus", () => {
    if (linkInput.classList.contains("error-input")) {
        linkInput.classList.remove("error-input");
    }
});

clearBtn.addEventListener("click", () => {
    linkInput.value = "";
    linkInput.classList.remove("error-input");

    while(resultContainer.firstChild){
        resultContainer.removeChild(resultContainer.firstChild);
    }
});

// helper functions

function createQRCodeDownloadLink(qrcodeImgSrc, resultContainer, linkTitle=''){
    const qrcodeImgDownloadLink = document.createElement("a");
    qrcodeImgDownloadLink.href = qrcodeImgSrc;    
    qrcodeImgDownloadLink.download = "qrcode.png";
    qrcodeImgDownloadLink.innerText = "Download It!";
    qrcodeImgDownloadLink.title = linkTitle;
    resultContainer.appendChild(qrcodeImgDownloadLink);
    qrcodeImgDownloadLink.classList.add("downloadImgLink");

    return qrcodeImgDownloadLink;
}

async function getQRCodeImgSource(parentElement){
    const qrcodeImg = parentElement.querySelector("img");
    const qrcodeImgSrc = await getImgSrc(qrcodeImg);
    return qrcodeImgSrc;
}

function getImgSrc(imgElement){
    return new Promise((resolve) => {
        if (imgElement.src){
            resolve(imgElement.src);
        } else {
            imgElement.addEventListener("load", () => {
                resolve(imgElement.src);
            });
        }
    });
}
