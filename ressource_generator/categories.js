const axios = require('axios')

const baseUrl = 'https://release-rloutlet-api.kangourouge.com/'

if (typeof localStorage === 'undefined' || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const result = {}

module.exports = {
    loadCategories: (data) => {
        if (null !== localStorage.getItem('categories')) {
            return
        }

        let categories = {}

        for (let [key, productModel] of Object.entries(data)) {
            productModel.categories.forEach(category => {
                categories[category] = category.toLowerCase()
            })
        }

        addEntry(Object.keys(categories), Object.values(categories))
    }
}

function addEntry(keys, values) {
    let name = values.pop()
    axios({
        method: 'post',
        url: baseUrl+'api/categories',
        data: {
            'translations': {
                'fr': {
                    'locale': 'fr',
                    'name': name
                },
                'en': {
                    'locale': 'en',
                    'name': name
                }
            }
        },
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-type': 'application/json'
        }
    })
    .then(function (response) {
        localStorage.setItem('categories'+[keys.pop()], response.data['@id'])

        if (0 < values.length) {
            addEntry(keys, values)
        } else {
            localStorage.setItem('categories', 1)
        }
    })
    .catch(function (error) {
        console.log(error);
    })
}
