For the gallery.html image slider,
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

For index.html image slider,
A timer is set which changes the source of the image every couple seconds
automatically. The index of the slide, that which image is to be displayed
is done similarly to gallery.html image slider via the use of slideIndex.


For the form in both contact.html and form.html,
Everything works on the dependancy of event listener. The function responsible
for the form is first ran when event page load occurs. There are two error
classes :- one for success and one for error. If the value inputed in the box
by the user is valid, success class is added to classList, which makes the box
border green. If not, error class is added and the box border becomes red with
the proper error message displayed below the box. A for loop is ran which checks
the validity of all boxes everytime the user focuses on either of the boxes
through the use of the blur event listener. Each form box has its own unique
method of verifiication checking for name, email, password. If all values inputed
in the boxes are valid, i.e. all boxes are green, the user is able to submit the
form. Else, if one or more boxes are invalid, submit button will do nothing.