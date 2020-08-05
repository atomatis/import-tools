if (typeof localStorage === 'undefined' || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage
    localStorage = new LocalStorage('./scratch')
}

const auth = require('./auth.js')
const formater = require('./formater.js')
const categories = require('./ressource_generator/categories.js')
const sizes = require('./ressource_generator/sizes.js')
const axios = require('axios')
const path = require('path');
const fs = require('fs');

const baseUrl = 'https://release-rloutlet-api.kangourouge.com/'
const directoryPath = path.join(__dirname, './file/image');

// IRI
const seasonIri = '/api/seasons/1' //'/api/seasons/1'
const brandIri = '/api/brands/1' //'/api/brands/1'
const typesIri = {
    'Men': '/api/types/1', //api/types/1'
    'Women': '/api/types/13', ///api/types/13
    'Children': '/api/types/14', ///api/types/14
}

totalProductModel = 0
totalProduct = 0
totalProductSize = 0

auth.getBearer(importCsv)

function importCsv() {
    formater.format('./file/to-import.csv', checkData)
}

function checkData(data) {
    categories.loadCategories(data)
    sizes.loadSizes(data)


    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file);
        });
    });


    return

    if (null === localStorage.getItem('categories') || null === localStorage.getItem('sizes') ) {
        console.log('loading data')

        return
    }

    addProductModelEntry(Object.values(data))
}

function addProductModelEntry(values) {
    let productModel = values.pop()
    let productModelData = formatProductModelData(productModel)

    axios({
        method: 'post',
        url: baseUrl+'api/product_models',
        data: productModelData,
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-type': 'application/json'
        }
    })
    .then(function (response) {
        let productModelIri = response.data['@id']
        totalProductModel++

        for (let [key, product] of Object.entries(productModel.products)) {
            registerProduct(productModelIri, productModel, product)

        }

        if (0 < values.length) {
            addProductModelEntry(values)
        }
    })
    .catch(function (error) {
        console.log(error);
    })
}


function registerProduct(productModelIri, productModel, product) {
    let productData = formatProductData(productModelIri, product)

    axios({
        method: 'post',
        url: baseUrl+'api/products',
        data: productData,
        headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-type': 'application/json'
        }
    })
    .then(function (response) {
        console.log(response.status + response.data['@id'])
    })
    .catch(function (error) {
        console.log(error)
    })

}


function formatProductModelData(productModel) {
    let categories = []

    productModel.categories.forEach(category => {
        categories.push(localStorage.getItem('categories'+category))
    })

    return {
        'name': productModel.name,
        'categories': categories,
        'translations': {
            'fr': {
                'locale': 'fr',
                'description': productModel.description
            },
            'en': {
                'locale': 'en',
                'description': productModel.description
            }
        },
        'type': typesIri[productModel.type],
        'brand': brandIri,
        'prices': [
            {
                'value': 10,
                'currency': '€'
            },
            {
                'value': 10,
                'currency': '£'
            },
        ]
    }
}

function formatProductData(productModelIri, product) {
    let productSizes = []

    product.sizes.forEach(size => {
        productSizes.push({
            size: localStorage.getItem('sizes'+size.size),
            EAN: size.ean,
        })
    })


    return {
        'SKU': product.sku,
        'season': seasonIri,
        'productModel': productModelIri,
        'productSizes': productSizes,
        'productImages': [],
        'color': product.hexa,
        'colorName': product.colorName,
        'translations': {
            'fr': {
                'locale': 'fr',
                'name': product.name
            },
            'en': {
                'locale': 'en',
                'name': product.name
            }
        },
    }
}


305627
305703
309448
