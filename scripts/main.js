const errorDiv = document.getElementById('error');
const spinner = document.getElementById('spninner')
const searchBook = () =>{
    spinner.classList.remove('d-none')
    const searchField = document.getElementById('seach-field');
    const searchText = searchField.value;
    // console.log(searchText)

    // data clear 
    searchField.value = '';
        const url =`https://openlibrary.org/search.json?q=${searchText}`
        
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data))
};

const displaySearchResult = books =>{
    // error handleing
    if(books.numFound === 0){
        errorDiv.innerHTML = `<h2>No result found</h2>`
    }else{
        errorDiv.innerText = ''
    };
    // console.log(books)
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // dispaly total books number
    const totalNum = document.getElementById('total-num');
    totalNum.textContent = '';
    const h3 = document.createElement('h3');
    h3.classList.add('total-number');
    h3.innerText = `
    Total number of result found : ${books.numFound}
    `
    totalNum.appendChild(h3)
    books.docs.forEach(book => {
        // console.log(book)
        // display books 
        const url = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
             <div class="card border-secondary mb-3 shadow p-3 rounded h-100">
                <img class="rounded" height="250px" src="${url}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title"><span class="text-secondary fw-semibold fs-5">Book Titel:</span> ${ book.title}</h5>
                  <h6 class="card-text"><span class="text-secondary fw-semibold fs-6">Author:</span> ${book.author_name? book.author_name:'N/A'}</h6>
                  <h6 class="card-text"><span class="text-secondary fw-semibold fs-6">Publisher:</span> ${book.publisher? book.publisher:'N/A'}</h6>
                  <h6 class="card-text"><span class="text-secondary fw-semibold fs-6">First Publish Year:</span> ${book.first_publish_year}</h6>
                </div>
              </div>
        `
        searchResult.appendChild(div);
    });
};
