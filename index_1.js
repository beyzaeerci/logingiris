function registerUser(){


    const firstname =document.getElementById('firstname').value;
    const lastname =document.getElementById('lastname').value;
    const email =document.getElementById('email').value;
    const password =document.getElementById('password').value;


    const userLoginInfo= {
        firstname,
        lastname,
        email,
        password
    };

fetch('http://localhost:3000/register', {
    method:"POST", 
    headers:{
        "content-type": "application/json"
    },
    body:JSON.stringify(userLoginInfo),
}).then(res => console.log(res))

}