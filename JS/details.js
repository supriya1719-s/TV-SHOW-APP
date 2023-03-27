const show_img_src = localStorage.getItem('selected_show_img');
const show_img_name = localStorage.getItem('selected_show_name');
let obj = {
    "name": show_img_name,
    "img": show_img_src
};

const fav_shows = JSON.parse(localStorage.getItem('fav_shows'));

let favourite;
let img_box = document.querySelector('img');
let name_box = document.querySelector('.name');
let heart_icon = document.querySelector('.heart-icon');

img_box.setAttribute('src', show_img_src);
name_box.innerHTML = show_img_name;
if (fav_shows.map(object => object.name).indexOf(show_img_name) != -1){
    favourite = true;
    heart_icon.innerHTML = "❤️";
}

heart_icon.addEventListener('click', () => {
    if(favourite){
        heart_icon.innerHTML = "🤍";
        let index;
        fav_shows.forEach((element, i) => {
            console.log(element.name, obj.name);
            if(element.name == obj.name){
                index = i;
            }    
        });
        fav_shows.splice(index, 1);
        favourite = false;
    }
    else{
        heart_icon.innerHTML = "❤️";
        fav_shows.push(obj);
        favourite = true;
    }
    localStorage.setItem('fav_shows', JSON.stringify(fav_shows));
})