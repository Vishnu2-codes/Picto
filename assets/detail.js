window.onload = function(){
    const location= window.location.href
    const url =new URL(location);
    const search_parms= new URLSearchParams(url.search); 


    if (!search_parms.has('id') || search_parms.get('id')==""){
        window.location.href = './';
}

fetch(`https://api.unsplash.com/photos/${search_parms.get('id')}?client_id=${API_KEY}`).then(convert_to_json).
    then(function(data) {
        loadDetail(data);

        document.getElementById('image_id').innerText = search_parms.get('id');
    });
}
function loadDetail(data) {
    console.log(data);
    document.getElementById('detail_image').src = data.urls.regular;
    document.getElementById('detail_image').style.borderColor= data.color;
    document.getElementById('description_text').innerText = data.description;
    document.getElementById('uploader').innerText= data.user.username;
    document.getElementById('like_count').innerText = data.likes;
    document.getElementById('view_count').innerText = data.views;
    document.getElementById('alt_description').innerText= data.alt_description;
    document.getElementById('download_link').href=data.links.download;

    const date= new Date(data.created_at);
    const upload_date = `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
    document.getElementById('upload_date').innerText =upload_date;
}