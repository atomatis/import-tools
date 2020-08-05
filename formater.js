const csv = require('csv-parser')
const fs = require('fs')
const results = []

module.exports = {
    format: (csvPath, callback) => {
        fs.createReadStream(csvPath)
        .pipe(csv({ separator: ';' }))
          .on('data', (data) => results.push(data))
          .on('end', () => {
              let data =  formatCsv(results)
              callback(data)
          })
    }
}

function formatCsv(table) {
    let data = {}
    let i = 0
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
                'sku': element.sku,
                'name': element.name,
                'colorName': element.colorName,
                'sizes': [],
                'hexa': '#FFFFFF',
            }
        }

        product = productModel.products[element.sku]

        if ('' !== element.hexa) product.hexa = element.hexa

        product.sizes.push({
            'ean': element.ean,
            'size': '' === element.size ? 'OS' : element.size,
        })
    })

    return data
}
