const axios = require('axios')

const baseUrl = 'https://release-rloutlet-api.kangourouge.com/'

if (typeof localStorage === 'undefined' || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const result = {}

module.exports = {
    loadSizes: (data) => {
        if (null !== localStorage.getItem('sizes')) {
            return
        }

        let sizes = {}

        for (let [key, productModel] of Object.entries(data)) {
            for (let [key, product] of Object.entries(productModel.products)) {
                product.sizes.forEach(element => {
                    sizes[element.size] = element.size.toLowerCase()
                })
            }
        }

        addEntry(Object.keys(sizes), Object.values(sizes))
    }
}

function addEntry(keys, values) {
    let name = values.pop()
    axios({
        method: 'post',
        url: baseUrl+'api/sizes',
        data: {
            'name': name
        },
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-type': 'application/json'
        }
    })
        .then(function (response) {
            localStorage.setItem('sizes'+[keys.pop()], response.data['@id'])

            if (0 < values.length) {
                addEntry(keys, values)
            } else {
                localStorage.setItem('sizes', 1)
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}
