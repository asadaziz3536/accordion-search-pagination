const InitAccordionPagintion = (list=[],$selector)=>{
    
const allFaqs = list


  const $wrapper = document.querySelector($selector);
  const $searchElem = document.querySelector('#search');
  const $nextButton = document.querySelector('#nextPage')
  let filterList = [];
  let currentPage = 1;
  let totalPages;
  let showItems = 2;
  //  Append Elem 
  const appendElem = (data) => {
    // Get the accordion element
var accordion = document.querySelector("#accordionExample");

// Destroy the previous instance of the accordion
accordion.classList.remove("show");
    return `<li class="single-accordion">
        <div class="accordian-heading" id="heading-${data.id}">
            <a href="javascript:void(0);" data-bs-toggle="collapse" data-bs-target="#collapse-${data.id}"
                class="collapsed">
                ${data.title}
            </a>
        </div>
        <div id="collapse-${data.id}" class="accordion-collapse collapse" aria-labelledby="heading${data.id}"
            data-bs-parent="#accordionExample">
            <div class="accordion-content">
                <p>${data.decription}</p>
            </div>
        </div>
    </li>`;
  };

  function accordionFunc(){
      $('#accordionExample').accordion({
        collapsible: true,
    });

  }
// Render into the DOM
const appendToDOM = (list=[]) =>{

    let listLength = Number(list.length)
    totalPages = Math.ceil(listLength / Number(showItems));
    let appendArray = list;
    if (currentPage <= totalPages) {
        list.splice(currentPage * showItems)
    }
    if (currentPage<totalPages) {
        $nextButton.removeAttribute('disabled');
        $nextButton.textContent = 'Next Page'
    } else {
        $nextButton.setAttribute('disabled',true)
        $nextButton.textContent = 'No More..'
    }

    
    $wrapper.innerHTML = '';
    if (list.length > 0){
        list.forEach(($elem)=>{
            $wrapper.innerHTML += appendElem($elem);
        });
    } else {
        $wrapper.innerHTML = `<p>No Data Found...</p>`
    }


    // reInit acc 
  // Get the new accordion element
var newAccordion = document.querySelector("#accordionExample");

// Re-create the accordion
newAccordion.classList.add("show");

   
}



appendToDOM(JSON.parse(JSON.stringify(allFaqs)));

$searchElem.addEventListener('input',(e)=>{
   let searchVal = (e.target.value || '').toLowerCase();
   filterList = [];
   currentPage = 1;
    allFaqs.forEach((faq)=>{
        
        if(faq.title.toLowerCase().search(searchVal) !== -1) {
            filterList.push(faq)
        }  
    });


    // append the filter list into the array
    appendToDOM(JSON.parse(JSON.stringify(filterList)));
});


// increase the current Page
$nextButton.addEventListener('click',()=>{
    currentPage+=1;
    console.log(currentPage)
    if(filterList.length > 0) {
        console.log(filterList,'Filter List')
        appendToDOM(JSON.parse(JSON.stringify(filterList)));
    } else {
        console.log(allFaqs,'All List')
        appendToDOM(JSON.parse(JSON.stringify(allFaqs)));
    }
})


}


const allFaqs = [
    {
        id:0,
        title:"This is title1",
        decription:"this is desc1"
    },
    {
        id:1,
        title:"This is title2",
        decription:"this is desc2"
    },
    {
        id:2,
        title:"This is title3",
        decription:"this is desc3"
    },
    {
        id:3,
        title:"This is title4",
        decription:"this is desc4"
    },
    {
        id:4,
        title:"This is title5",
        decription:"this is desc5"
    },
    {
        id:5,
        title:"This is title6",
        decription:"this is desc6"
    }
];


InitAccordionPagintion(allFaqs,'#accordionExample')