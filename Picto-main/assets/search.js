window.onload = function() {
    const location= window.location.href
    const url =new URL(location);
    const search_parms= new URLSearchParams(url.search);
    
    if (!search_parms.has('q') || search_parms.get('q')==""){
        window.location.href ='./';
    }

    fetch(`https://api.unsplash.com/search/photos?per_page=30&query=${search_parms.get('q')}&client_id=${API_KEY}`).then(convert_to_json).
    then(function(data){
        generateCard(data.results);

        document.getElementsByName('q')[0].value = search_parms.get('q');
        document.getElementById('search_query').innerText = search_parms.get('q');
    })
   };
function generateCard(data){
    console.log(data);
    const container= document.getElementById('result_container');
    for(let i=0 ; i < data.length;i++){
        const single_item= data[i];
        const card     = document.createElement('div');
        const anchor   = document.createElement('a');
        const img      = document.createElement('img');

        card.classList.add('item');
        anchor.href =`./detail.html?id=${single_item.id}`;
        card.style.backgroundColor = single_item.color;
        img.src = single_item.urls.thumb;

        anchor.appendChild(img);
        card.appendChild(anchor);
        container.appendChild(card);
    }
    }
