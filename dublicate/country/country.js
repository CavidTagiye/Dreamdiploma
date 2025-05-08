// URL-dən ölkə adını əldə edin
const params = new URLSearchParams(window.location.search);
const countryName = params.get('country');

// JSON faylını yükləyin
fetch('./country.json') // JSON faylının mövcud olduğu yola uyğunlaşdırıldı
    .then(response => response.json())
    .then(data => {
        // Ölkəni tapın
        const country = data.find(item => item.name === countryName);

        if (country) {
            // Səhifə başlığını dəyişdirin
            document.title = country.name;

            // Başlıq və təsvir
            document.querySelector('.page-header h1').textContent = country.name;
            document.querySelector('.page-header p').textContent = country.description;

            // Məlumatları doldurun
            document.querySelector('.country-info').innerHTML = `
                <h2>Lazım Ola Biləcək İmtahanlar</h2>
                <p>${country.exams}</p>
                <h2>Ümumi Məlumat</h2>
                <p>${country.description}</p>
                <h2>Ortalama Yaşam Xərcləri</h2>
                <p>${country.living_cost}</p>
                <h2>Təhsilin Keyfiyyəti</h2>
                <p>${country.education_quality}</p>
                <h2>Ən Yaxşı Tədris Olunan Sahələr</h2>
                <p>${country.top_fields}</p>
                <h2>Sosial Mühit</h2>
                <p>${country.social_environment}</p>
                <h2>Tövsiyyələr</h2>
                <p>${country.recommendations}</p>
            `;

            // Ən yaxşı universitetlər
            const universitiesList = document.querySelector('.top-universities ul');
            country.universities.forEach(university => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${university.link}">${university.name}</a>`;
                universitiesList.appendChild(li);
            });
        } else {
            document.querySelector('.page-header h1').textContent = "Məlumat tapılmadı";
        }
    })
    .catch(error => console.error('Error loading country data:', error));

document.addEventListener('DOMContentLoaded', () => {
    fetch('./country.json')
        .then(response => response.json())
        .then(data => {
            const country = data[0]; // Məsələn, ABŞ üçün məlumat
            const universityList = document.getElementById('universityList');

            country.universities.forEach(university => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="../universities/university.html?id=${university.link}">${university.name}</a>`;
                universityList.appendChild(li);
            });
        })
        .catch(error => console.error('Məlumat yüklənərkən xəta baş verdi:', error));

    const burgerMenu = document.getElementById('burgerMenu');
    const navLinks = document.getElementById('navLinks');

    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});