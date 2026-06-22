// ======================================
// VOLTFORGE FINAL JAVASCRIPT
// PART 1 - INITIALIZATION & CORE
// ======================================


// Website Start
document.addEventListener("DOMContentLoaded", () => {

    initializeWebsite();

});


// Initialize All Features
function initializeWebsite(){

    setupNavigation();

    setupBackToTop();

    setupSearch();

    setupFilters();

    loadPDFs();

    loadVideos();

    setupCounter();

}



// ======================================
// LOADER SYSTEM
// ======================================

window.addEventListener("load", () => {

    const loader =
    document.querySelector(".loader");


    if(loader){

        setTimeout(() => {


            loader.style.opacity = "0";

            loader.style.visibility = "hidden";


            setTimeout(() => {


                loader.style.display = "none";


            }, 500);


        }, 800);


    }


});




// ======================================
// SMOOTH NAVIGATION
// ======================================

function setupNavigation(){


    const links =
    document.querySelectorAll(
        'a[href^="#"]'
    );


    links.forEach(link => {


        link.addEventListener("click", function(e){


            e.preventDefault();


            const target =
            document.querySelector(
                this.getAttribute("href")
            );


            if(target){


                target.scrollIntoView({

                    behavior: "smooth"

                });


            }


        });


    });


}



// ======================================
// BACK TO TOP BUTTON
// ======================================


function setupBackToTop(){


    const button =
    document.getElementById("backToTop");


    if(!button) return;


    button.style.display = "none";


    window.addEventListener("scroll", () => {


        if(window.scrollY > 300){


            button.style.display = "flex";


        }

        else{


            button.style.display = "none";


        }


    });


    button.addEventListener("click", () => {


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


    });


}
// ======================================
// PART 2 - PDF LIBRARY SYSTEM
// ======================================


// Store all PDFs
let allPDFs = [];


// Load PDF Data from JSON
async function loadPDFs(){

    try{

        const response =
        await fetch("data/pdfs.json");


        if(!response.ok){

            throw new Error(
                "PDF JSON file not found"
            );

        }


        const data =
        await response.json();


        allPDFs = data;


        displayPDFs(allPDFs);


        console.log(
            "⚡ PDFs Loaded Successfully",
            allPDFs
        );


    }

    catch(error){


        console.error(
            "PDF Loading Error:",
            error
        );


        const container =
        document.querySelector(".pdf-container");


        if(container){

            container.innerHTML = `

            <div class="no-result">

                <h3>
                PDF Loading Failed
                </h3>

                <p>
                Please check pdfs.json file
                </p>

            </div>

            `;

        }

    }

}



// ======================================
// CREATE PDF CARDS
// ======================================


function displayPDFs(pdfs){


    const container =
    document.querySelector(".pdf-container");


    if(!container) return;


    // Clear old cards
    container.innerHTML = "";


    // If no result
    if(pdfs.length === 0){


        container.innerHTML = `

        <div class="no-result">

            No PDF Found

        </div>

        `;


        return;

    }



    // Create PDF Cards
    pdfs.forEach(pdf => {


        const card =
        document.createElement("div");


        card.className = "pdf-card";


        card.innerHTML = `

            <h3>
                ${pdf.title}
            </h3>


            <p>
                ${pdf.subject}
            </p>


            <a 
            href="${pdf.file}"
            target="_blank"
            class="btn">

                Download PDF

            </a>

        `;


        container.appendChild(card);


    });


}
// ======================================
// PART 3 - SEARCH, FILTER & VIDEOS
// ======================================


// ======================================
// PDF SEARCH SYSTEM
// ======================================

function setupSearch(){

    const searchBox =
    document.querySelector(
        ".search-box input"
    );


    if(!searchBox) return;


    searchBox.addEventListener(
        "input",
        function(){


            const value =
            this.value.toLowerCase();


            const result =
            allPDFs.filter(pdf => {


                return (

                    pdf.title
                    .toLowerCase()
                    .includes(value)

                    ||

                    pdf.subject
                    .toLowerCase()
                    .includes(value)

                );


            });


            displayPDFs(result);


        }

    );


}



// ======================================
// PDF FILTER SYSTEM
// ======================================


function setupFilters(){


    const buttons =
    document.querySelectorAll(
        ".filter-btn"
    );


    buttons.forEach(button => {


        button.addEventListener(
            "click",
            function(){


                // Active Button Change
                buttons.forEach(btn => {


                    btn.classList.remove(
                        "active"
                    );


                });


                this.classList.add(
                    "active"
                );


                const category =
                this.dataset.category;


                // Show All PDFs
                if(category === "all"){


                    displayPDFs(allPDFs);


                }


                // Filter Subject
                else{


                    const filtered =
                    allPDFs.filter(pdf => {


                        return (
                            pdf.category === category
                        );


                    });


                    displayPDFs(filtered);


                }


            }

        );


    });


}



// ======================================
// YOUTUBE VIDEO DATA
// ======================================


let allVideos = [];




// ======================================
// LOAD VIDEOS FROM JSON
// ======================================


async function loadVideos(){


    try{


        const response =
        await fetch(
            "data/videos.json"
        );


        if(!response.ok){


            throw new Error(
                "videos.json not found"
            );


        }


        const data =
        await response.json();


        allVideos = data;


        displayVideos(allVideos);


        console.log(
            "⚡ Videos Loaded Successfully",
            allVideos
        );


    }


    catch(error){


        console.error(
            "Video Loading Error:",
            error
        );


    }


}



// ======================================
// CREATE VIDEO CARDS
// ======================================


function displayVideos(videos){


    const container =
    document.querySelector(
        ".video-container"
    );


    if(!container) return;


    container.innerHTML = "";



    videos.forEach(video => {


        const card =
        document.createElement("div");


        card.className =
        "video-card";



        card.innerHTML = `

        <i class="fa-brands fa-youtube"></i>


        <h3>
            ${video.title}
        </h3>


        <p>
            ${video.subject}
        </p>


        <a 
        href="${video.link}"
        target="_blank"
        class="btn">

            Watch Class

        </a>

        `;


        container.appendChild(card);


    });


}
// ======================================
// PART 4 - COUNTER & ANIMATIONS
// ======================================


// ======================================
// COUNTER ANIMATION
// ======================================

function setupCounter(){

    const counters =
    document.querySelectorAll(".counter");


    const observer =
    new IntersectionObserver(entries => {


        entries.forEach(entry => {


            if(entry.isIntersecting){


                const counter =
                entry.target;


                const target =
                Number(
                    counter.dataset.target
                );


                let count = 0;


                const increment =
                target / 100;


                function updateCounter(){


                    count += increment;


                    if(count < target){


                        counter.innerText =
                        Math.ceil(count);


                        requestAnimationFrame(
                            updateCounter
                        );


                    }


                    else{


                        counter.innerText =
                        target;


                    }


                }


                updateCounter();


                // Run only once
                observer.unobserve(counter);


            }


        });


    });


    counters.forEach(counter => {


        observer.observe(counter);


    });


}



// ======================================
// SCROLL REVEAL ANIMATION
// ======================================

function setupScrollAnimation(){


    const observer =
    new IntersectionObserver(entries => {


        entries.forEach(entry => {


            if(entry.isIntersecting){


                entry.target.classList.add(
                    "show"
                );


            }


        });


    },{

        threshold: 0.15

    });



    const elements =
    document.querySelectorAll(
        ".pdf-card, .video-card, .stat-card, .exam-card, .about-content"
    );


    elements.forEach(element => {


        element.classList.add(
            "hidden"
        );


        observer.observe(element);


    });


}



// ======================================
// AUTO ANIMATION AFTER DATA LOAD
// ======================================


// Re-run animations when PDF cards are created
const originalDisplayPDFs = displayPDFs;

displayPDFs = function(pdfs){

    originalDisplayPDFs(pdfs);

    setupScrollAnimation();

};


// Re-run animations when Video cards are created
const originalDisplayVideos = displayVideos;

displayVideos = function(videos){

    originalDisplayVideos(videos);

    setupScrollAnimation();

};




// ======================================
// FINAL CONSOLE MESSAGE
// ======================================

console.log(
    "⚡ VOLTFORGE WEBSITE READY ⚡"
);