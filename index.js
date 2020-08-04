

const csv = require('csv-parser')
const async = require('async')
const axios = require('axios')
const fs = require('fs')
const results = []

let i = 0

let trys = []

//construct waterfall
// async.waterfall(trys), function (err) {
//     if (err) {
//         console.error(err)
//     }
// }


// axios({
//     method: 'put',
//     url: 'https://development-rloutlet-api.kangourouge.com/api/brands/252',
//     data: {
//         'name': 'haha'
//     },
//     headers: {
//         'Authorization': authKey,
//         'Content-type': 'application/json'
//     }
// })
// .then(function (response) {
//     console.log(response.data)
// })
// .catch(function (error) {
//     console.log(error);
// })

fs.createReadStream('file/to-import.csv')
.pipe(csv({ separator: ';' }))
  .on('data', (data) => results.push(data))
  .on('end', () => {
      
    let data = formatCsv(results)
    let categories = getCategories(data)
    let sizes = getSizes(data)


    console.log(categories)
    console.log(sizes)

  })


  function formatCsv(table) {
    let data = {}
    table.forEach(element => {
        i++
        // if (i > 10) return

        if (undefined === data[element.name]) {
            data[element.name] = {
                'name': element.name,
                'products': {},
                'categories': element.category.split('/'),
                'type': element.type,
                'description': element.description
            }
        }

        productModel = data[element.name]

        if (undefined === productModel.products[element.sku]) {
            productModel.products[element.sku] = {
                'name': element.name,
                'colorName': element.colorName,
                'sizes': [],
            }
        }

        product = productModel.products[element.sku]

        if ('' !== element.hexa) product.hexa = element.hexa

        product.sizes.push({
            'ean': element.ean,
            'size': element.size,
        })
    })

      return data
  }

  function getCategories(data) {
    let categories = []

    for (let [key, productModel] of Object.entries(data)) {
        productModel.categories.forEach(category => {
            categories[category] = category.toLowerCase()
        })
      }

    return categories
  }

  function getSizes(data) {
    let sizes = []

    for (let [key, productModel] of Object.entries(data)) {
        for (let [key, product] of Object.entries(productModel.products)) {
            product.sizes.forEach(element => {
                sizes[element.size] = element.size.toLowerCase()
            })
        }
    }

    return sizes
  }

  function test(next) {
      console.log('hello')
      next(null)
  }
