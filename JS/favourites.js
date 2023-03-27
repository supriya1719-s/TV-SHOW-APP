let fav_shows = JSON.parse(localStorage.getItem('fav_shows'));
let container = document.querySelector('.container');

for(let show_obj of fav_shows){
    let show = `<div class="card">
            <img src="${show_obj.img}" class="card-img">
            <div class="name">${show_obj.name}</div>
            <div class="heart-icon">❤️</div>
            <button class="button detail-btn">Details</button>
        </div>`;
    container.innerHTML += show;
}

let heart_icons = document.querySelectorAll('.heart-icon');
for(let heart_icon of heart_icons){
    heart_icon.onclick = () => {
        let obj = {
            name: heart_icon.previousElementSibling.innerHTML,
            img: heart_icon.previousElementSibling.previousElementSibling.getAttribute('src')
        }
        let index;
        fav_shows.forEach((element, i) => {
            console.log(element.name, obj.name);
            if (element.name == obj.name) {
                index = i;
            }
        });
        fav_shows.splice(index, 1);
        localStorage.setItem('fav_shows', JSON.stringify(fav_shows));
        
        let card = heart_icon.parentNode;
        card.remove();

        let dialog_box = document.querySelector('.dialog-box');
        dialog_box.innerHTML = 'Removed from Favourites';
        dialog_box.classList.add('display-block');
        setTimeout(() => {
            dialog_box.classList.remove('display-block');
        }, 1000);
    }
}

let detail_btns = document.querySelectorAll('.detail-btn');
for(let btn of detail_btns){
    btn.onclick= () => {
        localStorage.setItem('selected_show_name', btn.previousElementSibling.previousElementSibling.innerHTML);
        localStorage.setItem('selected_show_img', btn.previousElementSibling.previousElementSibling.previousElementSibling.getAttribute('src'));
        
        location.href = "../pages/details.html";
    }
}