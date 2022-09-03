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
        showCategroy.innerHTML += `<a class="nav-link pointer" onclick="loadNews('${category_id}')"  data-bs-toggle="pill">${category_name}</a>`;
    });    
    document.querySelector('#displayCategory .nav-link:first-child').classList.add('active')
}
const loadNews = (category_id)=>{
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    .catch(error => console.log(error));
}
loadNews('01')
const displayNews = (data)=>{
    const showNews = getId('displayNews');
    showNews.innerHTML='';
    data.forEach(news => {
        const {image_url, thumbnail_url, title, total_view, category_id, details} = news;
        const {img, name, published_date} = news.author;
        const newsItem = document.createElement('div');
        newsItem.classList.add('news_item');
        newsItem.innerHTML = `
            <div class="bg-white d-flex flex-column flex-md-row gap-4 p-3 shadow-sm rounded align-items-center">
                <!-- post thumbnail -->
                <div class="thumbnail d-flex">
                    <img src=${thumbnail_url} alt=${title}>
                </div>
                <!-- post content -->
                <div class="p-3">
                    <h2 class="text-dark mb-3">${title}</h2>
                    <div class="post_content">
                        <p>${details.length > 350 ? details.slice(0,350)+'...' : details}</p>
                    </div>
                    <!-- post info -->
                    <div class="d-flex justify-content-between gap-4 mt-4 align-items-center">
                        <!-- author info -->
                        <div class="d-flex align-items-center flex-column flex-sm-row gap-2">
                            <div class="author">
                                <img src="${img}" alt="${name}">
                            </div>
                            <div>
                                <p class="mb-0 text-dark">${name ? name : 'no name'}</p>
                                <p class="mb-0">${published_date}</p>
                            </div>
                        </div>
                        <!-- post view -->                                        
                        <div class="d-flex align-items-center gap-2 text-dark">
                            <i class="fa-regular fa-eye"></i>
                            <span><strong>${total_view?total_view:'0'}M</strong></span>
                        </div>
                            <!-- Button trigger modal -->
                        <a class="pointer text-primary h3 cursor-pointer" onclick="newsDetials('${category_id}')" data-bs-toggle="modal" data-bs-target="#detailNewsModal">
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        showNews.appendChild(newsItem);        
    })
}
loadCategory();