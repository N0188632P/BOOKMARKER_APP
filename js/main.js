//load and display bookmarks from localStarage
window.addEventListener('load', fetchBookmarks);
//listen for form submit event
document.getElementById('formEl').addEventListener('submit', saveBookmark);
//listen for bookmark click event
document.getElementById('bookmarksResults').addEventListener('click', bookmarkElClick);

//save bookmark
function saveBookmark(e)
{
 //get user input from form
   let siteName = document.getElementById('siteName').value;
   let siteUrl = document.getElementById('siteUrl').value;
//create new bookmark object using form values =   
   let bookmark = {
      name: siteName,
      url: siteUrl
   }
   
//if localStorage has no bookmarks array saved 
   if(!localStorage.getItem('bookmarks'))
   {
//create and store bookmarks array in local storage
      localStorage.setItem('bookmarks', '[]');
   }
//retrieve bookmarks array from local storage    
   let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//add the new bookmark object   
   bookmarks.push(bookmark);
//store updated bookmarks array in localStorage   
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
//clear the form input fields   
   document.getElementById('formEl').reset();
//fetch bookmarks from localStorage and display them in browser
   fetchBookmarks();
//prevent form submission
   e.preventDefault();
}
//fetch bookmarks
function fetchBookmarks()
{
//if localStorage has no bookmarks array saved 
   if(!localStorage.getItem('bookmarks'))
   {
//create and store bookmarks array in local storage
      localStorage.setItem('bookmarks', '[]');
   }
 //retrieve bookmarks array from local storage    
   let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//bookmarks container
   let bookmarksResults = document.getElementById('bookmarksResults');
   bookmarksResults.innerHTML = '';
//display each of the bookmarks in browser    
   for(let i = 0; i < bookmarks.length; i++)
   {
      let name = bookmarks[i].name;
      let url = bookmarks[i].url;
      
      let newEl = document.createElement('div');
      newEl.className = 'jumbotron';
      let bookmarkName = document.createElement('div');
      bookmarkName.className = 'h3';
      bookmarkName.textContent = `${name}`;
      
      let deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger btn-sm delete-btn';
      deleteBtn.appendChild(document.createTextNode('delete'));
   //   deleteBtn.style.height = "2.25rem";
      
      let visitBtn = document.createElement('a');
      visitBtn.setAttribute('href', `${url}`);
      visitBtn.setAttribute('target', '_blank');
      visitBtn.appendChild(document.createTextNode('visit'));
      visitBtn.className = 'btn btn-secondary visit-btn';
      //visitBtn.style.margin = '0.3rem';
      newEl.appendChild(bookmarkName);
   bookmarkName.appendChild(visitBtn);  
      bookmarkName.appendChild(deleteBtn);
      
      bookmarksResults.appendChild(newEl);
      
     // alert(`siteName${i}: ${name}\n siteUrl${i}: ${url}`);
   }
}

function bookmarkElClick(e)
{
 //if delete button is clicked 
   if(e.target.classList.contains('delete-btn'))
   {
//retrieve bookmarks array from local storage 
      let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
//delete all bookmarks with the same url as the one whose delete button was pressed
      for(let i = 0; i < bookmarks.length; i++)
      {
         if(bookmarks[i].url == e.target.previousSibling.getAttribute('href'))
         {
            if(confirm(`Are you sure you want to permanently delete ${e.target.parentElement.firstChild.textContent}`))
            {
               bookmarks.splice(i, 1);
            }
         }
      } 
//update localStorage 
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   }
   
   //display updated bookmarks
      fetchBookmarks();
}
