/*
Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. 
При клике на кнопку происходит следующее:
Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://loremflickr.com/json/g/320/240/all, 
где get-параметр limit — это введённое число.
*/
let form = document.getElementById('form')
let images = document.getElementById('images')
let error = document.getElementById('error')

form.addEventListener('submit', function (event) {
   event.preventDefault()

   error.textContent = ''
   images.innerHTML = ''

   let input = document.getElementById('limit').value
   if (input > 0 && input < 11) {
      const xhr = new XMLHttpRequest()

      xhr.onload = function () {
         let data = JSON.parse(xhr.response)
         if (Array.isArray(data)) {//Если бы ссылка из задания возвращала массив то можно было бы вывести галерею изображений
            data.forEach((imgObject) => {
               let img = document.createElement('img')
               img.src = imgObject.file
               images.appendChild(img)
            })
         } else {
            //Ссылка из задания возвращает всегда одно изображение поэтому требование задания вывести ниже КАРТИНКИ на экран некорректно
            //Выводим 1 изображение         
            let img = document.createElement('img')
            img.src = data.file
            images.appendChild(img)
         }
      }
      xhr.onerror = function () {
         console.log('Ошибка запроса')
      }
      //https://cors-anywhere.herokuapp.com/ добавлено к ссылке из задания т.к иначе возникает ошибка:
      //"has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource"
      //Для чего в задании требуется добавить параметр limit не понятно т.к. сервис loremflickr.com ничего о нем не знает 
      //и всегда возвращает 1 изображение.
      xhr.open('GET', `https://cors-anywhere.herokuapp.com/https://loremflickr.com/json/g/320/240/all/?limit=${input}`, true)
      xhr.send()
   } else {
      error.textContent = 'число вне диапазона от 1 до 10'
   }
})