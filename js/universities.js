fetch('../data/universities.json')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.universities-container');
        data.forEach(university => {
            const card = `
                <div class="university-card">
                    <div class="card-image">
                        <img src="${university.image}" alt="${university.name}">
                    </div>
                    <div class="card-content">
                        <h3>${university.name}</h3>
                        <p>${university.description}</p>
                        <a href="${university.link}" class="learn-more">Daha Ətraflı</a>
                    </div>
                </div>
            `;
            container.innerHTML += card;
        });
    })
    .catch(error => console.error('Error loading universities:', error));