
var slideIndex = 1;
var oldSlide;
showSlides(slideIndex);

function plusSlides(n) {
    oldSlide = slideIndex;
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {

    if (slideIndex==9) {
        slideIndex=1;
    }
    else if (slideIndex==0) {
        slideIndex=8;
    }

    let newName = "image" + slideIndex;
    let oldName = "image" + oldSlide;
    let getSlide = document.getElementById(newName);
    let getOldSlide = document.getElementById(oldName);

    getSlide.style.display = "block";
    getOldSlide.style.display = "none";

    //let i;

    //let slides = document.getElementsByClassName("mySlides");
    //let getImage = getSlide.getElementsByClassName(slideshow-img);
}

