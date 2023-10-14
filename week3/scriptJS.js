
//Slide Show

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

// Form

    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    var submittable = false;

    const elementArray = [username, email, password, confirmPassword];
    const messageArray = ["Username", "E-Mail", "Password", "Password"];

    addEventListener('load', event => {
      validateInputs();
    })


    form.addEventListener('submit', event => {

      submittable = validateForm();

      if (!submittable) {
        event.preventDefault();         //prevents form from being sent
      }                 
      
    })
    
    const setError = (element, errorMessage) => {                 //(element, text) are parameters
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector('.error');

      errorDisplay.innerText = errorMessage;
      inputControl.classList.add('error');
      inputControl.classList.remove('success');
    }

    const setSuccess = (element, successMessage) => {
      const inputControl = element.parentElement;
      const errorDisplay = inputControl.querySelector('.error');

      errorDisplay.innerText = successMessage;
      inputControl.classList.add('success');
      inputControl.classList.remove('error');
    };

    function validateForm() {

      var successCount = 0;

      for (let i=0; i<elementArray.length; i++) {

        if (elementArray[i].parentElement.classList.contains('success')) {
          successCount++;
        }

        else {
          return false;
        }

      }

      if (successCount == elementArray.length) {
        alert("Form Submitted!")
        return true;
      }

    }


    const validateInputs = () => {

      for (let i=0; i<messageArray.length; i++) {
        
        elementArray[i].addEventListener("blur", (event) => {

          if (elementArray[i].value.trim() === '') {
            setError(elementArray[i], messageArray[i] + ' is required');
          }

          else if (elementArray[i]==email) {

            var emailValue = elementArray[i].value.trimEnd();

            if (!emailValue.includes('@') || !emailValue.includes('.com') || emailValue.includes(' ')) {
              setError(elementArray[i], 'Valid ' + messageArray[i] + ' is required.   ex: 123@gmail.com');
            }
            else {
              setSuccess(elementArray[i], '');
            };

          }

          else if (elementArray[i]==password) {
            var passwordValue = elementArray[i].value;

            if (passwordValue.length<8) {
              setError(elementArray[i], messageArray[i] + ' must be 8 characters long');
            }
            else {
              setSuccess(elementArray[i], '');
            };
          }

          else if (elementArray[i]==confirmPassword) {
            var passwordValue = elementArray[i-1].value;
            var confirmPasswordValue = elementArray[i].value;

            if (confirmPasswordValue != passwordValue) {
              setError(elementArray[i], messageArray[i] + 's do not match');
            }
            else {
              setSuccess(elementArray[i], '');
            };
          }

          else {
            setSuccess(elementArray[i], '');
          }
          });

      }

    };

