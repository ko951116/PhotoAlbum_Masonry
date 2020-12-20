/*------------------------- Masonry Layout setting -----------------------------*/
function SetGridItemHeight() {
    let grid = document.getElementsByClassName('grid')[0];
    let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));

    let item = grid.getElementsByClassName('item');
    for (let i = 0; i < item.length; ++i) {
        item[i].style.gridRowEnd = `span ${Math.floor((item[i].children[0].offsetHeight) / 25)}`
    }
}

/*------------------------- Show Image -----------------------------*/
function closeImg() {
    document.querySelector(".img-window").remove();
    document.querySelector(".img-btn-next").remove();
    document.querySelector(".img-btn-before").remove();
}
function showImage() {
    let grid = document.getElementsByClassName('grid')[0];
    let item = grid.getElementsByClassName('item');
    let overlay = grid.getElementsByClassName('overlay');

    for (let i = 0; i < item.length; ++i) {
        overlay[i].onclick = function() {
            var current = this.previousElementSibling;

            let container = document.body;
            let newImgWindow = document.createElement('div');
            container.appendChild(newImgWindow);
            newImgWindow.setAttribute("class", "img-window");
            newImgWindow.setAttribute("onclick", "closeImg()");

            let newImg = document.createElement('img');
            newImgWindow.appendChild(newImg);

            newImg.setAttribute("src",current.getAttribute('src'));
            newImg.setAttribute("id","current-img");


            /* let nextBtn = document.getElementById('next');
            container.appendChild(nextBtn);
            nextBtn.setAttribute("class", "img-btn-next");
            nextBtn.setAttribute("onclick", "changeImg()");

            let beforeBtn = document.getElementById('before');
            container.appendChild(beforeBtn);
            beforeBtn.setAttribute("class", "img-btn-prev");
            beforeBtn.setAttribute("onclick", "changeImg()"); */

          
            /*------------------------- prev btn -----------------------------*/
            let newBeforeBtn = document.createElement("a");
            let btnBeforeText = document.createTextNode("<");
            newBeforeBtn.appendChild(btnBeforeText);
            container.appendChild(newBeforeBtn);
            newBeforeBtn.setAttribute("class", "img-btn-before");

            //click
            newBeforeBtn.onclick = function() {
                if(i===0) {
                    i=1;
                }
                document.querySelector("#current-img").remove();
                let newImg = document.createElement('img');
                newImgWindow.appendChild(newImg);
                newImg.setAttribute("src",overlay[--i].previousElementSibling.getAttribute('src'));
                newImg.setAttribute("id","current-img");
            }
                
            /*------------------------- next btn -----------------------------*/
            let newNextBtn = document.createElement("a");
            let btnNextText = document.createTextNode(">");
            newNextBtn.appendChild(btnNextText);
            container.appendChild(newNextBtn);
            newNextBtn.setAttribute("class", "img-btn-next");

            //click
            newNextBtn.onclick = function() {
                if(i===item.length-1) {
                    i=item.length-2;
                } 
                document.querySelector("#current-img").remove();
                let newImg = document.createElement('img');
                newImgWindow.appendChild(newImg);
                newImg.setAttribute("src",overlay[++i].previousElementSibling.getAttribute('src'));
                newImg.setAttribute("id","current-img");   
            }
        }
    }
}


window.addEventListener("load", SetGridItemHeight);
window.addEventListener("resize", SetGridItemHeight);
window.addEventListener("mousedown", showImage);

/*------------------------- Dark Mode -----------------------------*/
const checkbox = document.getElementById("checkbox");
const grid = document.getElementsByClassName("grid");
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    grid.classList.toggle("dark");
});

  