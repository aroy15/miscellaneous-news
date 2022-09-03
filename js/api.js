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
        const {image_url, thumbnail_url, title, toral_view, category_id} = news;
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
                    <h2 class="text-dark mb-3">The best fashion influencers to follow for sartorial inspiration</h2>
                    <div id="postContent">
                        <p>From our favourite UK influencers to the best missives from Milan and the coolest New Yorkers, read on some of the best fashion blogs out there, and for even more inspiration, do head to our separate black fashion influencer round-up.</p>
                        <p>Fancy some shopping deals? Check out these amazing sales: Zara Black Friday, ASOS Black Friday, Missoma Black Friday and Gucci Black Friday...</p>
                    </div>
                    <!-- post info -->
                    <div class="d-flex justify-content-between gap-4 mt-4 align-items-center">
                        <!-- author info -->
                        <div class="d-flex align-items-center flex-column flex-sm-row gap-2">
                            <div class="author">
                                <img src="img/author.png" alt="">
                            </div>
                            <div>
                                <p class="mb-0 text-dark">Jane Cooper</p>
                                <p class="mb-0">Jan 10,2022</p>
                            </div>
                        </div>
                        <!-- post view -->                                        
                        <div class="d-flex align-items-center gap-2 text-dark">
                            <i class="fa-regular fa-eye"></i>
                            <span><strong>1.5M</strong></span>
                        </div>
                            <!-- Button trigger modal -->
                        <a class="pointer text-primary h3 cursor-pointer" data-bs-toggle="modal" data-bs-target="#detailNewsModal">
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