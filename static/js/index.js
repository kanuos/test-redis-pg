// dashboard todo item functions
// start

const articleMenu = document.querySelector(".articleMenu");
const toggleArticleMenu = document.querySelectorAll(".toggleArticleMenu");


toggleArticleMenu?.forEach(btn => {
    btn.addEventListener("click", toggleArticle)
})


function toggleArticle() {
    articleMenu?.classList.toggle("translate-y-full")
    articleMenu?.classList.toggle("translate-y-0")
}

// dashboard todo item functions
// end


// login register password view/hide
// start
let isPasswordMode = true;
const passwordIcon = document.querySelectorAll(".passwordMode");
const passwordToggler = document.querySelector("#passwordTextToggler")


passwordToggler?.addEventListener("click", () => {
    isPasswordMode = !isPasswordMode;
    passwordIcon?.forEach(icon => icon.classList.toggle("hidden"))
    toggleInputType();
})

function toggleInputType(){
    const btn = passwordIcon[0]?.parentElement;
    const input = btn.previousElementSibling;
    const attribute = isPasswordMode ? "password" : "text"; 
    input.setAttribute("type", attribute)
}


// login register password view/hide
// end