/*
Напишите код приложения, который содержит в себе 2 инпута и кнопку, при нажатии происходит следующее:
Если число не совпадает от 100 до 500 — выводить ниже текст «число вне диапазона от 100 до 500»
Если число попадает в диапазон от 100 до 500 — сделать запрос c помощью XHR по URL https://loremflickr.com/json/g/320/240/all, 
где get-параметр 320 и 240 — это введённые числа..
*/
let form = document.getElementById('form')
let images = document.getElementById('images')
let error = document.getElementById('error')

form.addEventListener('submit', function (event) {
   event.preventDefault()

   error.textContent = ''
   images.innerHTML = ''

   let input1 = document.getElementById('number1').value
   let input2 = document.getElementById('number2').value

   if (input1 >= 100 && input1 <= 500 && input2 >= 100 && input2 <= 500) {
      //https://cors-anywhere.herokuapp.com/ добавлено к ссылке из задания т.к иначе возникает ошибка:
      //"has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource"
      fetch(`https://cors-anywhere.herokuapp.com/https://loremflickr.com/json/g/${input1}/${input2}/all`)
         .then((response) => response.json())
         .then((data) => {
            let img = document.createElement('img')
            img.src = data.file
            images.appendChild(img)
         })
         .catch((e) => {
            console.log('Ошибка запроса', e)
         })

   } else {
      error.textContent = 'одно из чисел вне диапазона от 100 до 500'
   }
})