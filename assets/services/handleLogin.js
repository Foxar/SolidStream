import Cookies from 'js-cookie';

export function handleLogin() {
    console.log(this);
    //Submit login data to backend, save the JWT token and save as a cookie to pass on 
    //with each next api call.
    const data = {
        "username": this.state.username,
        "password": this.state.password
    };
    const responsePromise = fetch('http://localhost:8000/api/login_check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    responsePromise.then(response => {
        //If the login_check response is OK, save the JWT token:
        if (response.ok) {
            response.json().then(
                data => {
                    //Save the JWT token to a cookie, clear error messages.
                    Cookies.set('jwt-token', data.token);
                    this.saveError("");

                    //Fetch user entity of the user that has logged in.
                    fetch('http://localhost:8000/secureapi/currentUser', {
                        method: 'GET',
                        headers: {
                            'Authorization': 'BEARER '.concat(Cookies.get('jwt-token'))
                        }
                    })
                        .then(response => {
                            if (response.ok) {
                                response.json().then(
                                    data => {
                                        Cookies.set('username', data.username);
                                        Cookies.set('userid', data.id);
                                        window.location.assign("/");
                                    }
                                );
                            } else {
                                this.setTimedError("Unknown error!");
                            }
                        });
                }
            );
        } else {
            //Otherwise, display error message.
            if (response.status == 401) {
                this.setTimedError("Invalid credentials!");
            }
            else
                this.setTimedError("Unknown error!");
        }
    });

}