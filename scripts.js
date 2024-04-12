document.addEventListener('DOMContentLoaded', function() {
    updateAnswer();
    fetchNews();
});

function updateAnswer() {
    const answers = [
        'עדיין לא. קופסאות טונה כבר יש בממ״ד?',
        'Yes, an attack was reported.',
        'Unable to confirm at this time.',
        'Please check back later for updates.',
        'Reports are unconfirmed.',
        'Situation remains unclear.'
    ];
    // Randomly choose an answer
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    setTimeout(() => {
        document.getElementById('answer').innerHTML = `<p>${randomAnswer}</p>`;
    }, 2000); // simulate a delay
}

function fetchNews() {
    const apiURL = 'https://api.webz.io/newsApiLite?token=ccdf7393-4791-4792-8010-d019fe1e74f9&q=iran%20israel';
    const newsList = document.getElementById('news-list');

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const articles = data.posts.slice(0, 3); // Fetch only the latest three articles
            articles.forEach(article => {
                const div = document.createElement('div');
                div.className = 'news-item';
                div.innerHTML = `
                    <img src="${article.thread.main_image}" alt="Article Image">
                    <a href="${article.thread.url}" target="_blank">${article.thread.title}</a>
                `;
                newsList.appendChild(div);
            });
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            newsList.innerHTML = '<p>שגיאה בקבלת החדשות. האם איראן תוקפים את האתר הזה כרגע?</p>';
        });
}
