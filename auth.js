const axios = require('axios')

const baseUrl = 'https://release-rloutlet-api.kangourouge.com/'

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

module.exports = {
    getBearer: (promise) => {

        if (null === localStorage.getItem('token')) {
            axios({
                method: 'post',
                url: baseUrl+'authentication',
                data: {
                    'email': 'admin@rloutlet.com',
                    'password': 'mdp'
                },
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then(function (response) {
                    localStorage.setItem('token', 'Bearer '+response.data.token);
                    promise()
                })
                .catch(function (error) {
                    console.log(error)
                })
        } else {
            console.log('token exist')
            promise()
        }
    }
}
