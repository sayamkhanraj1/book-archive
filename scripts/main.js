const searchBook = () =>{
    const searchField = document.getElementById('seach-field');
    const searchText = searchField.value;
    // console.log(searchText)

    // data clear 
    searchField.value = '';
    if (searchText === ''){
        // error message
    }else{
        const url =`http://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data))
    }
};

const displaySearchResult = books =>{
    console.log(books)
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // dispaly total books number
    const totalNum = document.getElementById('total-num');
    const h3 = document.createElement('h3');
    h3.classList.add('total-number')
    h3.innerText = `
    Total number of result found : ${books.numFound}
    `
    totalNum.appendChild(h3)
    if(books.length === 0){
        // error messgae
    }
    books.docs.forEach(book => {
        console.log(book)
        // display books 
        const url = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
             <div class="card">
                <img src="${url}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Book Titel: ${ book.title}</h5>
                  <p class="card-text">Author: ${book.author_name? book.author_name:'N/A'}</p>
                  <p class="card-text">Publisher: ${book.publisher? book.publisher:'N/A'}</p>
                  <p class="card-text">First Publish Year: ${book.first_publish_year}</p>
                </div>
              </div>
        `
        searchResult.appendChild(div)
    });
}