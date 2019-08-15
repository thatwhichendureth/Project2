/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
document.addEventListener("DOMContentLoaded", () => {
    appendPageLinks(studentList);
    appendSearchBar();
})

//define global variables
const studentList = document.querySelectorAll('.student-item');
const numberOfItemsPerPage = 10;
const page = document.querySelector('.page');


//show a certain page based on an argument 'pageNumber'
function showPage(list, pageNumber) {
    const ul = document.createElement('ul');
    ul.className = "student-list";
    let li = document.createElement('li');
    let startIndex = pageNumber * numberOfItemsPerPage - numberOfItemsPerPage;
    let endIndex = pageNumber * numberOfItemsPerPage;
    if (endIndex >= list.length) {
        endIndex = list.length;
    }
    for (let i = startIndex; i < endIndex; i += 1) {
        li = list[i];
        ul.appendChild(li);
    }
    const existingUl = document.querySelector('ul.student-list');
    const page = existingUl.parentNode;
    page.insertBefore(ul, existingUl);
    page.removeChild(existingUl);
}





//Appends pagination links to DOM and selects first one
function appendPageLinks(list) {
    const numberOfPages = Math.ceil(list.length/10);
    if (numberOfPages > 1) {
        const paginationDiv = document.createElement('div');
        paginationDiv.className = "pagination";
        const ul = document.createElement('ul');
        for (let i = 1; i <= (numberOfPages); i += 1) {
            ul.appendChild(createPageNumberLi(i));
        }
        paginationDiv.appendChild(ul);
        page.appendChild(paginationDiv);
        enablePageLinks();
        showPage(list, 1);
    }

    //return pagination link to append to the page
    function createPageNumberLi(number) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = number;
        a.href = "#";
        li.appendChild(a);
        return li;
    }

    //add event listener to pagination links
    function enablePageLinks() {
        const paginationDiv = page.querySelector('.pagination');
        paginationDiv.addEventListener('click', (e) => {
            const pageNumber = e.target.textContent;
            showPage(studentList, pageNumber);
        });
    }
}

//Append search bar to DOM
function appendSearchBar() {
    const searchDiv = document.createElement('div');
    searchDiv.className = 'student-search';
    const searchBar = document.createElement('input');
    searchBar.placeholder = "Search for students...";
    const searchButton = document.createElement('button');
    searchButton.textContent = "Search";

    searchDiv.appendChild(searchBar);
    searchDiv.appendChild(searchButton);
    const pageHeader = document.querySelector('.page-header');
    pageHeader.appendChild(searchDiv);

    enableSearch();
    function enableSearch() {
        searchButton.addEventListener('click', () => {
            searchInList(studentList, searchBar.value);
            console.log(searchBar.value);
        })
    }
}

function searchInList(list, query) {
    let searchResults = [];
    for (let i = 0; i < list.length; i += 1) {
        let listItem = list[i];
        let studentName = listItem.querySelector('h3').textContent;
        studentName = studentName.toLowerCase();
        if (studentName.includes(query.toLowerCase())) {
            searchResults.push(listItem)
        }
    }
    showPage(searchResults, 1);
    appendPageLinks(studentList);

}

