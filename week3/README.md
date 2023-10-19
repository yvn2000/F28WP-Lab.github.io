For the gallery.html image slider
For each time the prev/next buttons are clicked, a javascript code is ran.
In js, variable slideIndex holds the current slide number starting with 1.
For every click, showSlides function is ran via plusSlides which updates
the slideIndex to either plus or minus 1 of its previous value. showSlides
function then selects elements with the name mySlides i.e. every slide.
If the updated slideIndex exceeds the number of slides given or is less
than 1, slideIndex is then reset to the value which wouldve come next.
That is after last slide would be first slide, before first slide would be
last slide. Then a for loop is ran whick obtains the img element for each
slide with the id "image" + currentLoopIndex. If the image found has the
same number as the current slideIndex, then the display of that image is
set to block, otherwise it is set to none.