// JSON-dan məlumatları gətirmək və səhifəyə əlavə etmək
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const scholarshipName = urlParams.get("scholarship");

    // JSON məlumatlarını gətir
    fetch("../../dublicate/scholarship/scholarship.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("JSON faylı yüklənə bilmədi");
            }
            return response.json();
        })
        .then(data => {
            console.log("Scholarship Name:", scholarshipName);
            console.log("Data:", data);

            // JSON-dan uyğun təqaüd məlumatını tap
            const scholarship = data.find(item => item.name === scholarshipName);

            if (scholarship) {
                // Başlıq və təsvir
                document.getElementById("scholarship-title").textContent = scholarship.name;
                document.getElementById("scholarship-description").textContent = scholarship.description;

                // Təqaüd detalları
                const contentDiv = document.getElementById("scholarship-content");
                contentDiv.innerHTML = `
                    <h2>${scholarship.name}</h2>
                    <p><strong>Tip:</strong> ${scholarship.type}</p>
                    <p><strong>Müddət:</strong> ${scholarship.duration}</p>
                    <p><strong>Dərəcə:</strong> ${scholarship.degree}</p>
                    <h3>Uyğunluq Şərtləri</h3>
                    <ul>
                        <li><strong>Vətəndaşlıq:</strong> ${scholarship.eligibility.citizenship}</li>
                        <li><strong>Təhsil:</strong> ${scholarship.eligibility.education}</li>
                        <li><strong>Dil:</strong> ${scholarship.eligibility.language}</li>
                        <li><strong>İş Təcrübəsi:</strong> ${scholarship.eligibility.work_experience || "Tələb olunmur"}</li>
                        <li><strong>Geri Dönmə Tələbi:</strong> ${scholarship.eligibility.return_requirement || "Ehtiyac yoxdur"}</li>
                    </ul>
                    <h3>Faydalar</h3>
                    <ul>
                        <li><strong>Təhsil haqqı:</strong> ${scholarship.benefits.tuition}</li>
                        <li><strong>Aylıq təqaüd:</strong> ${scholarship.benefits.monthly_stipend}</li>
                        <li><strong>Səyahət:</strong> ${scholarship.benefits.travel}</li>
                        <li><strong>Viza dəstəyi:</strong> ${scholarship.benefits.visa}</li>
                        <li><strong>Gəliş yardımı:</strong> ${scholarship.benefits.arrival_allowance || "Mövcud deyil"}</li>
                        <li><strong>Gediş yardımı:</strong> ${scholarship.benefits.departure_allowance || "Mövcud deyil"}</li>
                        <li><strong>TB Test:</strong> ${scholarship.benefits.tb_test || "Mövcud deyil"}</li>
                    </ul>
                    <h3>Müraciət Prosesi</h3>
                    <p><strong>Müraciət dövrü:</strong> ${scholarship.application.period}</p>
                    <p><strong>Proses:</strong> ${scholarship.application.process}</p>
                    <h4>Tələb olunan sənədlər:</h4>
                    <ul>
                        ${scholarship.application.documents.map(doc => `<li>${doc}</li>`).join("")}
                    </ul>
                    <h3>Seçim Kriteriyaları</h3>
                    <ul>
                        <li><strong>Liderlik:</strong> ${scholarship.selection_criteria.leadership}</li>
                        <li><strong>Şəbəkələşmə:</strong> ${scholarship.selection_criteria.networking}</li>
                        <li><strong>Akademik Uyğunluq:</strong> ${scholarship.selection_criteria.academic_fit}</li>
                        <li><strong>Öhdəlik:</strong> ${scholarship.selection_criteria.commitment}</li>
                    </ul>
                    <h3>Məhdudiyyətlər</h3>
                    <ul>
                        <li><strong>Əvvəlki Təqaüd:</strong> ${scholarship.restrictions.previous_study || "Məhdudiyyət yoxdur"}</li>
                        <li><strong>İş Məhdudiyyəti:</strong> ${scholarship.restrictions.employment}</li>
                    </ul>
                    <p><a href="${scholarship.official_link}" target="_blank">Rəsmi Link</a></p>
                `;
            } else {
                document.getElementById("scholarship-content").innerHTML = "<p>Təqaüd tapılmadı.</p>";
            }
        })
        .catch(error => {
            console.error("Məlumat gətirilərkən xəta baş verdi:", error);
            document.getElementById("scholarship-content").innerHTML = "<p>Məlumat yüklənərkən xəta baş verdi.</p>";
        });
});