const authKey = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1OTY1NzUwNzcsImV4cCI6MTU5NjYwMzg3Nywicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6ImFkbWluQHJsb3V0bGV0LmNvbSJ9.I-EzO8oiAxaqRFYQfXrFp3CjZWaiwYER3l3n1UheVEZYmVUT0HdsdTqxLA89-UfNMhksaEHfuCXeL1SQ6Qrm3jJHFw5pwHdg0gIgPCgkw-qIE-DqJ10r9kD0JiEE0acMBTw3O-0oz4EQGdt4gLLvC1BoLUfOYVXtdNUiwEfJG5IdmkLzUbVsFuqzr5gWQXKbQSK-KyB8ZyZoIw30Ya7BMJP0EFZFNGLLJTQkRDnDfwXAQ-8ATi1IGSKfCi4v4sjBFcr_Lp2BjYQtREy4hyIIdFAvTQqwf-eWwH2kQMOIC67LO6ljc6acF-50MNOC_xaf3zjHw8LBvRjkRLyVXBWtD8l7dbshaW8ricNRgpQ-GdWzO3wEIT2bWlAqj8_Npr9NLz_YMaGYDBVc4W5Kq-pbn4R6eLb0wAJkr5pHoMNoN1Klzz8rxPKkbYI9YETS5JUUaJEPLTyZZ3wwFUVAL3oym2rKsLIUZcloAVJVmHOsbHmLbrjMQ-_F6qSpk_mzX36_H_2_2qyGuuTOIFH7NNmwHiJaWnm3S5PwY-JEMgP_68fHl0qe0tiGpOJM-dAlGLH_YQkScHAhP3HHJsKmaGjpsLm88Ec4FSQxzfMlR13M828W-DCsKxKR5Lro8AzDYujPdw_Vs0sWwWxrKaJjyxk0WOuPgNpGQevpEYiKsFhcx2c'

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'name', title: 'Name'},
    {id: 'surname', title: 'Surname'},
    {id: 'age', title: 'Age'},
    {id: 'gender', title: 'Gender'},
  ]
})

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: 'out.csv',
  header: [
    {id: 'name', title: 'Name'},
    {id: 'surname', title: 'Surname'},
    {id: 'age', title: 'Age'},
    {id: 'gender', title: 'Gender'},
  ]
})
