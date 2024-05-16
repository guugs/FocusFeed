document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const keywordInput = document.getElementById('keywordInput');
  const searchButton = document.getElementById('searchButton');
  const articlesContainer = document.getElementById('articles');

  // Function to fetch news articles based on user interests
  const fetchNews = async (keywords) => {
    const apiKey = '5e645e978d4eccae78004f5ef21352ff'; // Replace with your actual API key
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(keywords)}&apikey=${apiKey}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.error('Network response was not ok:', response.statusText);
        throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.articles) {
        throw new Error('No articles found in the response');
      }

      return data.articles;
    } catch (error) {
      console.error('Error fetching news:', error);
      articlesContainer.innerHTML = `<p>Error fetching news: ${error.message}</p>`;
      return [];
    }
  };

  // Render news articles
  const renderNews = (articles) => {
    if (!Array.isArray(articles)) {
      console.error('Expected articles to be an array, got:', articles);
      articlesContainer.innerHTML = '<p>Error loading articles.</p>';
      return;
    }

    articlesContainer.innerHTML = articles.map(article => `
      <div class="article">
        <h2>${article.title}</h2>
        <p>${article.description}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      </div>
    `).join('');
  };

  // Event listener for search button
  searchButton.addEventListener('click', () => {
    const keywords = keywordInput.value.trim();
    if (keywords) {
      fetchNews(keywords).then(articles => renderNews(articles));
    } else {
      articlesContainer.innerHTML = '<p>Please enter some keywords to search.</p>';
    }
  });
});
