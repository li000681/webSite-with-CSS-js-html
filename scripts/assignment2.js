$(document).ready(function() {
    var darkModeStatus = false;
    var savedMode = getCookie("mode");
    
    if (savedMode!=""){
        darkModeStatus = (savedMode === 'true');
        setDarkMode(darkModeStatus);
    }

    var name = getCookie("name");
    var email = getCookie("email");
    var phone = getCookie("phone");
    autofillCookies(name,email,phone);
    
    $("#dark_mode").on("click", function() {
        if (darkModeStatus == true) {
            setDarkMode(false);
        } else {
            setDarkMode(true);
        }

        darkModeStatus = !darkModeStatus;
        setCookie("mode", darkModeStatus, 30);
    });

    function setDarkMode(mode) {
        if (mode == true) {
            $("#dark_mode").text("Light");
            $("body").addClass("d-dark");
            $("#nav-brand-img").attr("src", "./img/Logo-Alt.svg");

        } else if (mode == false) {
            $("#dark_mode").text("Dark");
            $("body").removeClass("d-dark");
            $("#nav-brand-img").attr("src", "./img/Logo.svg");
        }
    }

    

    

    function autofillCookies() {
        let name = getCookie("name");
        let email = getCookie("email");
        let phone = getCookie("phone");
        if (name != "") {
            $("#name").val(name);
        }

        if (email != "") {
            $("#email").val(email);
        }

        if (phone != "") {
            $("#phone").val(phone);
        }

    }

    let nameError = true;
    let phoneError = true;
    let emailError = true;
    

    function validateName() {
        let usernameValue = $('#name').val();
        if (usernameValue.length == '') {
            $("#nameError").text("Please enter your name");
            nameError = false;
            return false;
        }
    }

    function validateEmail() {
        let emailValue = $('#email').val();
        if (emailValue.length == '') {
            $("#emailError").text("Please enter your email");
            emailError = false;
            return false;
        }
    }

    function validatePhone() {
        let phoneValue = $('#phone').val();
        if (phoneValue.length == '') {
            $("#phoneError").text("Please enter your phone number");
            phoneError = false;
            return false;
        }
    }
    $("#submit").on("click", function(e) {
        // e.preventDefault();
        validateName();
        validateEmail();
        validatePhone();
        if (nameError == true && emailError == true && phoneError == true) {
            setCookie("name", $('#name').val(), 30);
            setCookie("email", $('#email').val(), 30);
            setCookie("phone", $('#phone').val(), 30);
            location.reload();
            return true;
        } else {
            return false;
        }
    });
    $(":reset").on("click", function() {
        $("#emailError").text("");
        $("#nameError").text("");
        $("#phoneError").text("");
    })

})

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function delCookies(name,email,phone,mode){
    setCookie("name", name, -10);
    setCookie("email", email, -10);
    setCookie("phone", phone, -10);
    setCookie("mode", mode, -10);
}