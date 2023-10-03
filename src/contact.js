(function(){
    emailjs.init("79RentwGDeFTpUfmc");
})();

document.getElementById('sendContact').addEventListener('click', function(event){
    event.preventDefault();

    if(validateForm()){
        let user_fname = document.getElementById('user_fname').value;
        let user_lname = document.getElementById('user_lname').value;
        let user_email = document.getElementById('user_email').value;
        let user_phone = document.getElementById('user_phone').value;
        let user_message = document.getElementById('user_message').value;

        emailjs.send("service_fs0ii5s", "template_5xo2uts", {
            from_name: user_fname, user_lname,
            message: user_message,
            user_email: user_email,
            user_phone: user_phone
        }).then(function(response){
            console.log("Email sent successfully!", response.status, response.text)
            let contactForm = document.getElementById("contactForm");
            contactForm.reset();
            let sentEmail = document.getElementById("emailStatus");
            sentEmail.textContent = "Email successfully sent to hkaur@udel.edu";
            sentEmail.style.color = "green";
        }, function(err){
            console.error("Failed to send the email", err);
            let errorEmailing = document.getElementById("emailStatus");
            errorEmailing.textContent = "An error occurred while sending the email";
            errorEmailing.style.color = "red";
        });
    } else{
        let errorEmailing = document.getElementById("emailStatus");
        errorEmailing.textContent = "Please recheck your input in the form";
        errorEmailing.style.color = "red";
    }


});

function validateForm(){
    let isValid = true; 

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;
    const phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;

    ["fnameValidation", "lnameValidation", "emailValidation", "messageValidation", "phoneValidation"].forEach(id => {
        document.getElementById(id).textContent = '';
    });

    ["fname", "lname", "email", "message", "phoneNumber"].forEach(id => {
        document.getElementById(id).classList.remove('invalid');
    });

    let firstName = document.getElementById('fname').value;
    let lastName = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phoneNumber').value;
    let message = document.getElementById('message').value;

    if(!firstName){
        isValid = false;
        let firstNameVal = document.getElementById("fnameValidation");
        firstNameVal.textContent = "First name is required";
        firstNameVal.style.color = "red";
        document.getElementById('fname').classList.add('invalid');
    }

    if(!lastName){
        isValid = false;
        let lastName = document.getElementById("lnameValidation");
        lastName.textContent = "Last name is required";
        lastName.style.color = "red";
        document.getElementById('lname').classList.add('invalid');
    }

    if(!email){
        isValid = false;
        let email = document.getElementById("emailValidation");
        email.textContent = "Email is required";
        email.style.color = "red";
        document.getElementById('email').classList.add('invalid');
    }else{
        if(!emailPattern.test(email)){
            isValid = false;
            let emailPattern = document.getElementById("emailValidation");
            emailPattern.textContent = "Please enter an email address in the form: xyz@domain.<upper-level domain>";
            emailPattern.style.color = "red";
            document.getElementById('email').classList.add('invalid');
        }
    }

    if(!message){
        isValid = false;
        let message = document.getElementById("messageValidation");
        message.textContent = "A message is required";
        message.style.color = "red";
        document.getElementById('message').classList.add('invalid');
    }

    if(!phoneNumber && !phoneNumberPattern.test(phone)){
        isValid = false;
        let phonePattern = document.getElementById("phoneValidation");
        phonePattern.textContent = "Please enter a phone number in the form: 123-456-7890";
        phonePattern.style.color = "red";
        document.getElementById('phoneNumber').classList.add('invalid');
    }

    return isValid;


}