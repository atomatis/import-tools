const axios = require('axios')

function getBearer() {
    axios({
        method: 'post',
        url: 'https://development-rloutlet-api.kangourouge.com/authentication',
        data: {
            'email': 'admin@rloutlet.com',
            'password': 'mdp'
        },
        headers: {
            'Content-type': 'application/json'
        }
    })
    .then(function (response) {
        console.log(response.data)
    })
    .catch(function (error) {
        console.log(error);
    })
}
