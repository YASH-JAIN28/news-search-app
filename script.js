const apikey = '527e9c938897495c92da1d55f3595f8c'

const blogcontainer = document.getElementById("blog-container");
const searchFeild = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')
async function fetchRandomNews(){
    try{
        const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=50&apikey=${apikey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;

    } catch(error){
        console.error("Error fetching random news",error)
        return[];

    }
    searchButton.addEventListener("click",async ()=>{
        const query = searchFeild.value.trim()
        if(query !==""){
            try{
                const articles= await fetchNewsquery(query)
                displayBlogs(articles)

            }catch(error){
                console.log("Error fetching news by query",error)

            }
        }
    })
     async function fetchNewsquery(query){
        try{
            const apiUrl=`https://newsapi.org/v2/everything?q=${query}&pageSize=50&apikey=${apikey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data.articles;
           } catch(error){
            console.error("Error fetching random news",error)
            return[];
           }
     }
}
function displayBlogs(articles) {
    blogcontainer.innerHTML = "";
    articles.forEach((article) =>{
        const blogcard = document.createElement ("div")
        blogcard.classList.add("blog-card")
        const img= document.createElement("img")
        img.src = article.urlToImage
        img.alt = article.title
        const title= document.createElement("h2")
        const TruncatedTitle= article.title.length >30?
        article.title.slice(0,30) +".......":
        article.title;
        title.textContent=TruncatedTitle;
        const description = document.createElement("p");
        const TruncatedDes= article.description.length >120?
        article.description.slice(0,120) +".......":
        article.description;
        description.textContent = TruncatedDes;

        blogcard.appendChild(img)
        blogcard.appendChild(title)
        blogcard.appendChild(description)
        blogcard.addEventListener('click',()=>{
            window.open(article.url, "_blank")
        })
        blogcontainer.appendChild(blogcard)
    })
}

(async ()=>{
    try{
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    }catch(error){
        console.error("Error fetching random news",error);
    }
})();