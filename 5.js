/*
Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «ширина картинки».
Заголовок второго input — «высота картинки».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 100 до 500 или не является числом — выводить ниже текст «Ширина картинки вне диапазона от 100 до 500»;
Если число во втором input не попадает в диапазон от 100 до 500 или не является числом — выводить ниже текст «Высота картинки вне диапазона от 100 до 500»;
Если числа попадают в диапазон от 100 до 500 — сделать запрос по URL https://source.unsplash.com/collection/928423/${imageWidth}x${imageHeight}/?sig=${randomNumber}, где GET-параметр imageWidth — это число из первого input, imageHeight — это введённое число второго input, randomNumber - число которое генерируется с помощью функции Math.floor(Math.random() * numImagesAvailable);
где numImagesAvailable — какое количество фото должно браться из коллекции, а также randomNumber — является аргументом функции при выполнении кнопки "Запрос", не забываем что они должны ограничиваться по отображению на странице, делается это с помощью цикла

После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).
*/
let form = document.getElementById('form')
let images = document.getElementById('images')
let error = document.getElementById('error')
let data = localStorage.getItem('localData')

showImages(JSON.parse(data))

form.addEventListener('submit', function (event) {
   event.preventDefault()

   error.textContent = ''
   images.innerHTML = ''

   let numImagesAvailable = 10
   let imageWidth = document.getElementById('imageWidth').value
   let imageHeight = document.getElementById('imageHeight').value
   let fetches = []
   let arrayImageLinks = []

   if (typeof imageWidth != "number" || imageWidth < 100 || imageWidth > 500) {
      error.textContent = 'Ширина картинки вне диапазона от 100 до 500'
      return
   }

   if (typeof imageHeight != "number" || imageHeight < 100 || imageHeight > 500) {
      error.textContent = 'Высота картинки вне диапазона от 100 до 500'
      return
   }

   for (let i = 0; i < numImagesAvailable; i++) {
      let randomNumber = Math.floor(Math.random() * numImagesAvailable)
      fetches.push(
         fetch(`https://source.unsplash.com/collection/928423/${imageWidth}x${imageHeight}/?sig=${randomNumber}`)
         .then((data) => {
            arrayImageLinks.push(data.url)
         })
         .catch((e) => {
            console.log('Ошибка запроса', e)
         })
      )
   }

   Promise.all(fetches).then(() => {
      localStorage.setItem('localData', JSON.stringify(arrayImageLinks))
      showImages(arrayImageLinks)
   });
})

function showImages(arrayImageLinks) {
   if (arrayImageLinks) {
      arrayImageLinks.forEach((url) => {
         let img = document.createElement('img')
         img.src = url
         images.appendChild(img)
      })
   }
}