async function fetchNews() {
    const query = document.getElementById('query').value || 'latest';
    const apiKey = '27ea978b2fcc40f1a12dbff0be003169';
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status !== 'ok') throw new Error('Failed to fetch news');

        const newsList = document.getElementById('newsList');
        newsList.innerHTML = data.articles.map(article => `
            <div class="news-card">
                <img src="${article.urlToImage || 'https://via.placeholder.com/300'}" alt="News image">
                <h2>${article.title}</h2>
                <p>${article.description || 'No description available.'}</p>
                <a href="${article.url}" target="_blank">Read more</a>
            </div>
        `).join('');
    } catch (error) {
        document.getElementById('newsList').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

// Fetch default news on load
fetchNews();
