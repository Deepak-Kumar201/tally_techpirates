import "./Styles/loader.css"
export default function Loader(){
    window.addEventListener("scroll", ()=>{
        document.querySelector(".loader").style.top = window.scrollY + "px";
    })
    return(
        <div className="loader">
            <div class="ring">
                Loading
                <span></span>
            </div>
        </div>
    )
}