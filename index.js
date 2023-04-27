function loginUser(){


    const username =document.getElementById('username').value;
    const password =document.getElementById('password').value;


    const userLoginInfo= {
        username,
        password
    };

fetch('http://localhost:3000/login', {
    method:"POST", 
    headers:{
        "content-type": "application/json"
    },
    body:JSON.stringify(userLoginInfo),
}).then(async res => {
    const jsonRes = await res.json();
    localStorage.setItem('users', JSON.stringify(res))
});

}