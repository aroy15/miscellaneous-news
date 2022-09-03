const getId = id => document.getElementById(id);

const loadCategory = ()=>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategory(data.data))
    .catch(error => console.log(error));
}
const displayCategory = (data)=>{
    const showCategroy = getId('displayCategory');
    data.news_category.forEach(item => {
        const {category_id, category_name} = item;
        showCategroy.innerHTML += `<a class="nav-link pointer" onclick="displayNews('cateId${category_id}')"  data-bs-toggle="pill">${category_name}</a>`;
    });
}
loadCategory();