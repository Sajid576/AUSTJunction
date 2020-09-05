    const _name = document.getElementById("name");
    const _email = document.getElementById("email");
    const _phone = document.getElementById("phoneNumber");
    const _sendCodeBtn = document.getElementById("send-code");
    const _submitBtn = document.getElementById("submit_data");
    //requestStoreUserData("sajju@gmail.com","sajid ahmed","42424","e2ee233dd33")
    //requestEditUserData("sajju@gmail.com","sajid ahmed","e2ee233dd33","Meghna")
    //requestFetchUserData("e2ee233dd33")
    //requestFetchLectures("CSE","3.1");
    //requestStoreContactData("e2ee233dd33","sajid ahmed","sajju@gmail.com","contribution","LEEL")
    initLocationFetchThread("Meghna-1");
    

  //  const _usernameinhome=document.getElementById("usernameinhome");
   

    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: function(response) {
            console.log("callback.......");
            
          }
        }
      
      );

      _sendCodeBtn.addEventListener('click', e => {
        e.preventDefault();
        sendCode();
      });
      function sendCode()
      {
        var phoneNumber = document.getElementById("phoneNumber").value;

        phoneNumber="+88"+phoneNumber;
        console.log(phoneNumber);
        if(_phone.value.length!=11)
        {
            alert("Mobile No. must be 11 digit !!");
        }
        if ( _name.value == "" || _email.value == "" || _phone.value == "")
        {
            alert("Please fill out details!");
        }else
        {
           var appVerifier = window.recaptchaVerifier;
           firebase
             .auth()
             .signInWithPhoneNumber(phoneNumber,appVerifier)
             .then(function(confirmationResult)
             {
               window.confirmationResult=confirmationResult;
             })
             .catch(function(error) {
               console.log(error);
             });
           }
       }

    
    _submitBtn.addEventListener('click', e =>
    {
      var code = document.getElementById("code").value;
      if(code =="")
      {
        alert("Please fill out verification code!");
        console.log("code de!!");
      }else{
        console.log("Lagbe na!!");
        e.preventDefault();
      //  var code = document.getElementById("code").value;
        confirmationResult
          .confirm(code)
          .then(function(result) {
            var user = result.user;
                //send request to store data
                 requestStoreUserData(_email.value,_name.value,_phone.value,user.uid);
                // Store in local storage api
                  localStorage.setItem("email", _email.value);
                  localStorage.setItem("userName", _name.value);
                  localStorage.setItem("phone", _phone.value);
                  localStorage.setItem("uid", user.uid);
                  
                  //clear the textfield
                 _name.value="";
                 _email.value="";
                 _phone.value="";
                 document.getElementById("code").value="";

          })
          .catch(function(error) {
            console.log(error);
          });
      }
      });




