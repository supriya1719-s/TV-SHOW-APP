let tv_shows_box = document.querySelector('.tv-shows');
let input_box = document.querySelector('.search-box');
let tv_shows_obj;

let fav_shows = JSON.parse(localStorage.getItem('fav_shows'));
if(fav_shows == null){
    fav_shows = [];
}

input_box.addEventListener('input', (event) => {
    tv_shows_box.innerHTML = "";
    let input = event.target.value;
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        tv_shows_obj = data;
        if (tv_shows_obj != undefined) {
            for (let show_obj of tv_shows_obj) {
                let show = `<div class="show-box">
                <img src="${(show_obj.show.image ? show_obj.show.image.medium : 'https://static.vecteezy.com/system/resources/thumbnails/002/267/298/small/tv-show-neon-signs-style-text-free-vector.jpg')}" height="100px" width="80px" class="show-img"></img>
                <div class="show-details">
                    <p class="show-name">${show_obj.show.name}</p>
                    <button class="button detail-btn">Details💪</button>
                    <button class="button fav-btn">${(fav_shows == null) ? `Add to My Favourites💛` : (fav_shows.map(object => object.name).indexOf(show_obj.show.name) != -1 ? `Remove from My Favourites❌` : `Add to My Favourites💛`)}</button>
                </div>
            </div>`;
                tv_shows_box.innerHTML += show;
            }

            let detail_btns = document.querySelectorAll('.detail-btn');
            for (let btn of detail_btns) {
                btn.onclick = function () {
                    // redirect to details page
                    location.href = "./pages/details.html";

                    // setting value of selected show img in local storage
                    localStorage.setItem('selected_show_img', btn.parentNode.previousSibling.previousSibling.getAttribute('src'));
                    localStorage.setItem('selected_show_name', btn.previousElementSibling.innerHTML);
                };
            }

            let favs_btns = document.querySelectorAll('.fav-btn');
            for (let btn of favs_btns) {
                let btn_text = btn.innerHTML;
                if (btn_text != 'Add to My Favourites💛') {
                    btn.classList.add('orange-bg');
                }
                btn.onclick = function () {
                    btn_text = btn.innerHTML;
                    // changing text of button
                    let obj = {
                        "name": btn.previousElementSibling.previousElementSibling.innerHTML,
                        "img": btn.parentNode.previousSibling.previousSibling.getAttribute('src')
                    };
                    let dialog_box = document.querySelector('.dialog-box');
                    // adding to favs
                    if (btn_text == 'Add to My Favourites💛') {
                        dialog_box.innerHTML = 'Added to Favourites';
                        // text changed to remove
                        btn.innerHTML = 'Remove from My Favourites❌';
                        btn.classList.add('orange-bg');
                        // show added to favs
                        fav_shows.push(obj);
                    }

                    // removing from favs
                    else {
                        dialog_box.innerHTML = 'Removed from Favourites';
                        // text changes to add
                        btn.innerHTML = 'Add to My Favourites💛';
                        btn.classList.remove('orange-bg');
                        // show removed from favs
                        let index;
                        fav_shows.forEach((element, i) => {
                            console.log(element.name, obj.name);
                            if (element.name == obj.name) {
                                index = i;
                            }
                        });
                        fav_shows.splice(index, 1);
                    }
                    localStorage.setItem('fav_shows', JSON.stringify(fav_shows));
                    
                    dialog_box.classList.add('display-block');
                    setTimeout(() => {
                        dialog_box.classList.remove('display-block');
                    }, 1000);
                };
            }
        }
    });
});