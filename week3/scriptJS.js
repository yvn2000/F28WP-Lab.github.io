
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

    let slides = document.getElementsByClassName("mySlides");
    let numSlides = slides.length;

    if (slideIndex>numSlides) {     // slider resets to first
        slideIndex=1;
    }
    else if (slideIndex<1) {        // slider resets to last
        slideIndex=numSlides;
    }

    for (let i=1; i<=numSlides; i++) {

        let getSlide = document.getElementById("image" + i);   //id name changes based on slideIndex

        if (i==slideIndex) { getSlide.style.display = "block";}

        else {getSlide.style.display = "none";}
    }

    

}

