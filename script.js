

var page=1;
var searched="Batman";
var ID="tt0372784";
var rating_comment=new Map();

// fetch(`https://www.omdbapi.com/?s=Batman&apikey=68204de4`)
// .then((response)=>{

//     if(!response.ok)
//     {
//         throw new Error('Network Response was not ok');
//     }
    
//     return response.json();
// }).then((data)=>{
//     let result = []
//     Object.keys(data['Search']).map((key) => result.push(data['Search'][key]) )
//     console.log(result[0])
//     show_movie(result);
// }).catch((error)=>{
//     console.log("Error found: ",error.message)
// });





let Next=(x)=>{
    page++;
    console.log(x);
    Search();
}

let Prev=(x)=>{
    console.log(x);
    page--;
    if(page<=0)
    {
        page=1;
    }
    Search();
}


let show_movie=(data)=>{
    let ele=document.getElementById("movie_list");
    ele.innerHTML=``;
    let text='';



    data.forEach((movie)=>{

let div = document.createElement("div");
div.className = "card";
let imag=document.createElement("img")
imag.src=movie.Poster;
imag.className="list_poster"
imag.alt=movie.Title;
imag.style.cursor="pointer";
imag.addEventListener("click", ()=>{
    ID=movie.imdbID;
   details(movie.imdbID);
});
div.appendChild(imag);

let p=document.createElement("p");
p.className="movie_name"
p.textContent=movie.Title;
div.appendChild(p);

ele.appendChild(div);
         
    })

   
}

let Submit=()=>{
    let comm=document.getElementById("comment").value;
    let ele=document.getElementById('rate').children;
    let star="";
    for(let i=0;i<ele.length;i++)
    {
        if (ele[i].type = "radio") {
 
            if (ele[i].checked)
                {
                    star=ele[i].value;
                }
        }
    }

    if(rating_comment.hasOwnProperty(ID))
    {
        rating_comment[ID].push({"rating":star,"comment":comm});
    }
else
{
rating_comment[ID]=[{"rating":star,"comment":comm}];
}
    console.log(rating_comment);

    
    document.getElementById('rate_btn').disabled = true;
    document.getElementById('rate_btn').innerText="Submitted"

}



let Back=()=>{
    document.getElementById('movie_listing').style.display= "block";
    document.getElementById('movie_info').style.display= "none";
    // console.log("Back called");
    Search();
}

let details=(x)=>{

    document.getElementById("loader").style.display="block";
    document.getElementById('movie_listing').style.display= "none";
    document.getElementById('movie_info').style.display= "block";

    // console.log("details called: ",x);

    let ele=document.getElementById("movie_info");
    ele.innerHTML=`<div class="submovie"><div><button class="btn" onclick='Back()'>Back</button></div>`

    fetch(`https://www.omdbapi.com/?i=${x}&apikey=68204de4`)
.then((response)=>{

    if(!response.ok)
    {
        throw new Error('Network Response was not ok');
    }
    
    return response.json();
}).then((data)=>{
   
    document.getElementById("loader").style.display="none";
    // console.log(data);

    let text=`<div class="details"> <div class="main_img"><img src="${data['Poster']}" class="detail_img"></div>`; 
    text+=`<div class="main"><h3>Title</h3><p>${data.Title}</p></div>`;
    text+=`<div class="main"><h3>Year</h3><p>${data.Year}</p></div>`;
    text+=`<div class="main"><h3>Rated</h3><p>${data.Rated}</p></div>`;
    text+=`<div class="main"><h3>Released</h3><p>${data.Released}</p></div>`;
    text+=`<div class="main"><h3>Runtime</h3><p>${data.Runtime}</p></div>`;
    text+=`<div class="main"><h3>Genre</h3><p>${data.Genre}</p></div>`;
    text+=`<div class="main"><h3>Director</h3><p>${data.Director}</p></div>`;
    text+=`<div class="main"><h3>Writer</h3><p>${data.Writer}</p></div>`;
    text+=`<div class="main"><h3>Actors</h3><p>${data.Actors}</p></div>`;
    text+=`<div class="main"><h3>Plot</h3><p>${data.Plot}</p></div>`;
    text+=`<div class="main"><h3>Language</h3><p>${data.Language}</p></div>`;
    text+=`<div class="main"><h3>Country</h3><p>${data.Country}</p></div>`;
    text+=`<div class="main"><h3>Awards</h3><p>${data.Awards}</p></div>`;
    text+=`<div class="main"><h3>Metascore</h3><p>${data.Metascore}</p></div>`;
    text+=`<div class="main"><h3>imdbRating</h3><p>${data.imdbRating}</p></div>`;
    text+=`<div class="main"><h3>imdbVotes</h3><p>${data.imdbVotes}</p></div>`;
    text+=`<div class="main"><h3>Type</h3><p>${data.Type}</p></div>`;
    text+=`<div class="main"><h3>DVD</h3><p>${data.DVD}</p></div>`;
    text+=`<div class="main"><h3>BoxOffice</h3><p>${data.BoxOffice}</p></div>`;

    text+=`
    <div class="user_rate">
<h4>Add a comment</h4>
<div id="rate">
<input type="radio" id="star5" name="rate" value="5" />
<label>5 stars</label>
<input type="radio" id="star4" name="rate" value="4" />
<label>4 stars</label>
<input type="radio" id="star3" name="rate" value="3" />
<label>3 stars</label>
<input type="radio" id="star2" name="rate" value="2" />
<label>2 stars</label>
<input type="radio" id="star1" name="rate" value="1" checked/>
<label>1 star</label>
</div>
<div class="comment-area"> <textarea id="comment" placeholder="what is your view?" rows="4"></textarea> </div>
<div class="rating_div"> <button class="btn" id="rate_btn" onclick="Submit()">Submit</button> </div>
</div>
</div></div>`

ele.innerHTML+=text;


}).catch((error)=>{
    document.getElementById("loader").style.display="none";
    console.log("Error found: ", error.message)
});




}




let Search=()=>{
    let val=document.getElementById('search_movie').value;
    // console.log("Val: ",val);
    if(val!="")
    { searched=val;
    }
    else
    {
        document.getElementById('search_movie').value="Batman";
    }
    document.getElementById("loader").style.display="block";
    document.getElementById('page_number').innerHTML=page;
    fetch(`https://www.omdbapi.com/?s=${searched}&page=${page}&apikey=68204de4`)
    .then((response)=>{
    
        if(!response.ok)
        {
            throw new Error('Network Response was not ok');
        }

        // console.log(response);
        
        return response.json();
    }).then((data)=>{
       
        let result = []
        Object.keys(data['Search']).map((key) => result.push(data['Search'][key]) )
        // console.log(result.length)
        if(result.length==0)
        {
            window.alert("Movie you are searching not found!")
        }
        document.getElementById("loader").style.display="none";
        show_movie(result);
    }).catch((error)=>{

        document.getElementById("loader").style.display="none";
        console.log("Error found: ",error.message)
    });
    


}

window.onload = function() { 
    Search();
    // details(ID);
 };