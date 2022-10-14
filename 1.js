/*
Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, 
который будет преобразовывать XML в JS-объект и выводить его в консоль.
*/

const xmlString = `<list>
<student>
  <name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
  </name>
  <age>35</age>
  <prof>teacher</prof>
</student>
<student>
  <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
  </name>
  <age>58</age>
  <prof>driver</prof>
</student>
</list>`

let parser = new DOMParser()

let doc = parser.parseFromString(xmlString, 'text/xml')

let students = doc.getElementsByTagName("student");

let arr = [];

for (let i = 0; i < students.length; i++) {
   let lang = students[i].getElementsByTagName("name")[0].getAttribute('lang');
   let first = students[i].getElementsByTagName("first")[0].childNodes[0].nodeValue;
   let second = students[i].getElementsByTagName("second")[0].childNodes[0].nodeValue;
   let prof = students[i].getElementsByTagName("prof")[0].childNodes[0].nodeValue;
   let age = students[i].getElementsByTagName("age")[0].childNodes[0].nodeValue;

   arr[i] = {
      name: `${first} ${second}`,
      age: Number(age),
      prof: prof,
      lang: lang
   };
}

console.log({
   list: arr
});