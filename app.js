const containerImg = document.getElementById("images")
const search = document.getElementById("name")
const button = document.getElementById("btn")
const containerImg2 = document.getElementById("images2")
const results = document.getElementById("results")
const favourite = document.getElementById("favourite")




const getTvShow = async () => {
    containerImg.innerHTML = ""
    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${search.value}`)
    const data = res.data
    console.log(data)
    results.innerText = `Here are your Results for "${search.value}"`
    for (let i = 0; i < data.length; i++) {
        
        if (data[i].show.image) {
            const newDiv = document.createElement("div")
            newDiv.setAttribute("id", "imgContainer")
            containerImg.append(newDiv)
            const newImg = document.createElement("img")
            newImg.setAttribute("src", res.data[i].show.image.original)
            newDiv.append(newImg)
            const title = document.createElement("h4")
            title.innerText = res.data[i].show.name
            newDiv.append(title)
            if (res.data[i].show.rating.average) {
                const rating = document.createElement("p")
                rating.innerHTML = `Rating: ${res.data[i].show.rating.average}`
                newDiv.append(rating)
            }
            search.value = ""
            newDiv.setAttribute("data-bs-toggle", "modal")
            newDiv.setAttribute("data-bs-target", "#exampleModal")
            const modalImages = document.getElementById("modalImage")
            newDiv.addEventListener("click", () => {
                modalImages.innerHTML = ""
                const modelTitle = document.getElementById("exampleModalLabel")
                modelTitle.innerText = res.data[i].show.name
                const summary = document.getElementById("summary")
                summary.innerHTML = res.data[i].show.summary
                const modalImage = document.createElement('img')
                modalImage.setAttribute("src", res.data[i].show.image.original)
                modalImages.append(modalImage)
                const rating = document.getElementById("rating")

                favourite.addEventListener("click", () => {
                    const newDivFav = document.createElement("div")
                    
                        newDivFav.setAttribute("id", "imgContainer2")
                        
                        const newImg2 = document.createElement("img")
                        newImg2.setAttribute("src", res.data[i].show.image.original)
                        newDivFav.append(newImg2)
                        const title2 = document.createElement("h4")
                        title2.innerText = res.data[i].show.name
                        newDivFav.append(title2)
                        if (res.data[i].show.rating.average) {
                            const rating2 = document.createElement("p")
                            rating2.innerHTML = `Rating: ${res.data[i].show.rating.average}`
                            newDivFav.append(rating2)
                        }
                      
                        containerImg2.append(newDivFav)
                        console.log(containerImg2)
                        
                       
                        
                        
                        
                })
                if (res.data[i].show.rating.average) {
                    rating.innerText = `Rating: ${res.data[i].show.rating.average}`
                } else {
                    rating.innerText = `Rating: N/A`
                }
                
               
            }
            
            
            
            )
            
        }
    }
}

btn.addEventListener("click", getTvShow)
search.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        getTvShow()
    }
})

