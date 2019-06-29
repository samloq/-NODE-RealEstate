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

function numberValidator(e, sel) {
    if(e.target.value < 0) {
        e.target.value = '';
    }
    let char = String.fromCharCode(e.target.value);
    for(let i=0; i< e.target.value.length; i++) {
        if(!(e.target.value.charCodeAt(i) > 48 && e.target.value.charCodeAt(i) <= 57)) {
            e.target.value = '';
        }
    }
}

function formatZipCode(e) {
    if(e.target.value < 0) {
        e.target.value = '';
    }
    let char = String.fromCharCode(e.target.value);
    for(let i=0; i< e.target.value.length; i++) {
        if(!(e.target.value.charCodeAt(i) > 48 && e.target.value.charCodeAt(i) <= 57)) {
            e.target.value = '';
        }
    }
}




$( document ).ready(function() {
    let imageInputSel = document.getElementById('propertyImageInput');
    let imageWrapperSel = document.getElementById('imageWrapper');
    let imgPreviewSel = document.getElementById('imgPreview');
    
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

    let tvSel = document.getElementById('tv');
    tvSel.addEventListener('keyup', function(e) {
        setTimeout(function() {
            numberValidator(e, tvSel);
        }, 1000);
    })

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

    /*Zip-Code*/
    let zipCodeSel = document.getElementById('zipCode');
    // zipCodeSel.addEventListener('keyup',function(e) {
    //     setTimeout(function(){
    //         formatZipCode(e);
    //     }, 1000);
    // });

    //===============VALIDATION===============//








    imageInputSel.addEventListener('change',function(e) {
        window.location.reload();
    })


    $.each(imageInputSel.files, function(i, file) {
        let index = i;
        let img = document.createElement("img");
        let wrapper = document.createElement('div');
        let fileSize = file.size > 1048576 ? true : false;

        wrapper.classList += 'col-lg-2 col-sm-4 col-xs-6 text-center';
        img.id = "image"+(i+1);
        img.classList = 'img--preview';
        
        
        let reader = new FileReader();
        reader.onloadend = function () {
            img.src = reader.result;
            if( fileSize ){
                wrapper.innerText = 'File is too big, max 1MB';
                $(imgPreviewSel).after(wrapper);
            } else {
                wrapper.appendChild(img);
            }
        }
        reader.readAsDataURL(file);
        $(imgPreviewSel).after(wrapper);
    });

});