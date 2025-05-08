document.addEventListener("DOMContentLoaded", function () {
    // URL-dən "exam" parametrini əldə et
    const urlParams = new URLSearchParams(window.location.search);
    const selectedExam = urlParams.get("exam"); // Məsələn: ?exam=ielts

    // JSON faylını fetch vasitəsilə gətir
    fetch("exam.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("JSON faylı yüklənə bilmədi");
            }
            return response.json();
        })
        .then(data => {
            const contentDiv = document.getElementById("exam-content");

            // Seçilmiş imtahanı tap
            const selectedData = data.find(item => item.name.toLowerCase() === selectedExam.toLowerCase());

            if (selectedData) {
                // Başlıq və təsviri əlavə et
                const header = document.createElement("div");
                header.classList.add("exam-header");
                header.innerHTML = `
                    <h1>${selectedData.name || "İmtahan adı mövcud deyil"}</h1>
                    <p>${selectedData.description || "Təsvir mövcud deyil"}</p>
                `;
                contentDiv.appendChild(header);

                // İmtahan bölmələrini əlavə et
                const sections = document.createElement("div");
                sections.classList.add("exam-sections");
                sections.innerHTML = `
                    <h2>İmtahan Bölmələri</h2>
                    <p>${selectedData.exam_sections || "İmtahan bölmələri haqqında məlumat yoxdur"}</p>
                `;
                contentDiv.appendChild(sections);

                // Bal aralığını əlavə et
                const scoreRange = document.createElement("div");
                scoreRange.classList.add("exam-score-range");
                scoreRange.innerHTML = `
                    <h2>Bal Aralığı</h2>
                    <p>${selectedData.score_range || "Bal aralığı haqqında məlumat yoxdur"}</p>
                `;
                contentDiv.appendChild(scoreRange);

                // Qiyməti əlavə et
                const price = document.createElement("div");
                price.classList.add("exam-price");
                price.innerHTML = `
                    <h2>İmtahan Qiyməti</h2>
                    <p>${selectedData.exam_price || "Qiymət haqqında məlumat yoxdur"}</p>
                `;
                contentDiv.appendChild(price);

                // Şərtləri əlavə et
                const conditions = document.createElement("div");
                conditions.classList.add("exam-conditions");
                conditions.innerHTML = `
                    <h2>İmtahan Şərtləri</h2>
                    <p>${selectedData.exam_conditions || "Şərtlər haqqında məlumat yoxdur"}</p>
                `;
                contentDiv.appendChild(conditions);

                // Tövsiyələri əlavə et
                const recommendations = document.createElement("div");
                recommendations.classList.add("exam-recommendations");
                recommendations.innerHTML = `
                    <h2>Tövsiyələr</h2>
                    <ul>
                        ${selectedData.recommendations.map(item => `<li>${item}</li>`).join("")}
                    </ul>
                `;
                contentDiv.appendChild(recommendations);

                // Rəsmi linki əlavə et
                const officialLink = document.createElement("div");
                officialLink.classList.add("exam-official-link");
                officialLink.innerHTML = `
                    <h2>Rəsmi Link</h2>
                    <p><a href="${selectedData.official_link}" target="_blank">Rəsmi Sayt</a></p>
                `;
                contentDiv.appendChild(officialLink);
            } else {
                // Əgər seçilmiş imtahan tapılmasa
                contentDiv.innerHTML = "<p>Seçilmiş imtahan haqqında məlumat tapılmadı.</p>";
            }
        })
        .catch(error => {
            console.error("Məlumat gətirilərkən xəta baş verdi:", error);
            document.getElementById("exam-content").innerHTML = "<p>Məlumat yüklənərkən xəta baş verdi.</p>";
        });
});