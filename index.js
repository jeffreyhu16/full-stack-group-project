const title = document.querySelector('.title-input');
const review = document.querySelector('.review-input');
const formSubmit = document.querySelector('.form-submit');
const cardWrapper = document.querySelector('.card-wrapper');

fetch('http://localhost:3000/comments')
    .then(res => res.json())
    .then(data => showReviews(data))
    .catch(err => console.log(err));

formSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title: title.value,
            review: review.value
        })
    })
    .then(res => res.json())
    .then(data => showReviews([data]))
    .catch(err => console.log(err));
    window.location.reload();
});

function showReviews(data) {
    data.map(comment => {
        cardWrapper.insertAdjacentHTML('beforeend', 
        `<div class="card">
            <h2 class="h3">
                <img
                src="https://scontent-tpe1-1.xx.fbcdn.net/v/t31.18172-8/1614293_973299279403678_2274578205457950467_o.jpg?stp=dst-jpg_s600x600&_nc_cat=102&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=--lvAIpJVL8AX855LHG&_nc_ht=scontent-tpe1-1.xx&oh=00_AT_WiUSEH6QbgqDoPGSMUCsGMz4ef0d6EUXd_rQ1E_Z7yw&oe=6247F70B"
                alt="">
                ${comment.title}
            </h2>
            <div class="word">${comment.review}</div>
            <div class="d-flex justify-content-end">
                <a href="*"><i class="fas fa-edit" style="width: 25px;"></i></a>&nbsp;&nbsp;
                <a href="*"><i class="fas fa-eraser" style="width: 25px;"></i></a>
            </div>
        </div>`
        );
    });
}