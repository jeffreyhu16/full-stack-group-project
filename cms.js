const sidebarContent = document.querySelector('.sidebar_content');
const mainContent = document.querySelector('.main_content');
const deleteBtn = document.querySelector('.delete-btn');

let i = 0;
let reviewArr
let clickedReviewTitle

fetch('http://localhost:3000/comments')
    .then(res => res.json())
    .then(data => showTitles(data))
    .then(() => addClickListener())
    .catch(err => console.log(err));

deleteBtn.addEventListener('click', () => {
    fetch('http://localhost:3000/comment', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: clickedReviewTitle
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
    window.location.reload();
})

function showTitles(data) {
    reviewArr = data;
    data.map(comment => {
        sidebarContent.insertAdjacentHTML(
            'beforeend', 
            `<a href="#" class="title-${++i}">${comment.title}</a>`
        );
    });
}

function addClickListener() {
    for (let j = 1; j <= reviewArr.length; j++) {
        document
            .querySelector(`.title-${j}`)
            .addEventListener('click', () => {
                const clickedReview = reviewArr[j - 1];
                clickedReviewTitle = clickedReview.title;
                mainContent.textContent = clickedReview.review;
            });
        
    }
}

function showReviews(reviewArr, index) {
    mainContent.textContent = reviewArr[index - 1].review;
}