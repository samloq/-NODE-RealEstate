function scrollBottom() {
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    return false;
}

function isInputNumber(e) {
    let char = String.fromCharCode(e.which);
    if(!(/[0-9]/.test(char))) {
        e.preventDefault();
    }
}

function formatNumber(e, sel) {
        let textVal = numeral(e.target.value).format('0,0');
        e.target.value = textVal;
        if(textVal == 0) {
            e.target.value = '';
        }
}


$( document ).ready(function() {
    let imageInputSel = document.getElementById('propertyImageInput');
    let imageWrapperSel = document.getElementById('imageWrapper');
    
    
    //Scroll down when accordion is activated
    let featuresAccordion = document.getElementById('accordion');
    featuresAccordion.addEventListener('click',scrollBottom);

    
    
    //===============VALIDATION===============//

    /*Price*/
    let priceSel = document.getElementById('price');
    priceSel.addEventListener('keyup',function(e) {
        setTimeout(function(){
            formatNumber(e, priceSel);
        }, 1000);
    });

    /*Mortgage*/
    let mortgageSel = document.getElementById('mortgage');
    mortgageSel.addEventListener('keyup',function(e) {
        setTimeout(function(){
            formatNumber(e, mortgageSel);
        }, 1000);
    });

    /*Sqft.*/
    let sqftSel = document.getElementById('sqft');
    sqftSel.addEventListener('keyup',function(e) {
        setTimeout(function(){
            formatNumber(e, sqftSel);
        }, 1000);
    });

    /*Bathrooms*/
    let bathroomsSel = document.querySelectorAll('[name=bathrooms]')[0];
    bathroomsSel.addEventListener('keypress', isInputNumber);


    /*Rooms*/
    let roomsSel = document.querySelectorAll('[name=rooms]')[0];
    roomsSel.addEventListener('keypress', isInputNumber);

    //===============VALIDATION===============//



    imageInputSel.addEventListener('change',function(e) {
        window.location.reload();
    })

    $.each(imageInputSel.files, function(i, file) {
        var img = document.createElement("img");
        img.id = "image"+(i+1);
        var reader = new FileReader();
        reader.onloadend = function () {
            img.src = reader.result;
        }
        reader.readAsDataURL(file);
        $("#imageWrapper").after(img);
    });
});