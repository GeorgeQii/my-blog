const fs = require('fs');
const path = require('path');

async function fetchIssues() {
  const response = await fetch('https://api.github.com/repos/<your-username>/my-blog/issues');
  const issues = await response.json();
  return issues;
}

async function buildBlog() {
  const articles = await fetchIssues();
  const mainSection = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const articleSections = articles.map(article => `
    <section id="one">
      <div class="inner">
        <header class="major">
          <h1>${article.title}</h1>
        </header>
        <p>${article.body}</p>
      </div>
    </section>
  `).join('');
  const finalHtml = mainSection.replace('<div id="main" class="alt">', `<div id="main" class="alt">${articleSections}`);
  fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), finalHtml);
}

buildBlog();