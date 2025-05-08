document.addEventListener("DOMContentLoaded", function () {
    // URL-dən "field" parametrini əldə et
    const urlParams = new URLSearchParams(window.location.search);
    const selectedField = urlParams.get("field");

    // JSON-dan məlumatları gətir
    fetch("career.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("JSON faylı yüklənə bilmədi");
            }
            return response.json();
        })
        .then(data => {
            const contentDiv = document.getElementById("career-content");

            // Seçilmiş sahəni tap
            const selectedData = data.find(item => item.ad === selectedField);

            if (selectedData) {
                // Ümumi təsviri əlavə et
                const generalInfo = document.createElement("div");
                generalInfo.classList.add("general-info");
                generalInfo.innerHTML = `
                    <h1>${selectedData.ad || "Məlumat yoxdur"}</h1>
                    <p>${selectedData.umumi_terif || "Ümumi təsvir mövcud deyil"}</p>
                `;
                contentDiv.appendChild(generalInfo);

                // İxtisasları əlavə et
                const specialtiesDiv = document.createElement("div");
                specialtiesDiv.classList.add("specialties");

                selectedData.ixtisaslar.forEach(ixtisas => {
                    const specialtyItem = document.createElement("div");
                    specialtyItem.classList.add("specialty-item");

                    specialtyItem.innerHTML = `
                        <h2>${ixtisas.ad || "İxtisas adı mövcud deyil"}</h2>
                        <p>${ixtisas.terif || "Təsvir mövcud deyil"}</p>
                        ${ixtisas.universitetler && ixtisas.universitetler.length > 0 ? `
                            <p><strong>Universitetlər:</strong></p>
                            <ul>
                                ${ixtisas.universitetler.map(university => `<li>${university}</li>`).join("")}
                            </ul>
                        ` : "<p>Universitetlər haqqında məlumat yoxdur.</p>"}
                    `;

                    specialtiesDiv.appendChild(specialtyItem);
                });

                contentDiv.appendChild(specialtiesDiv);
            } else {
                // Əgər seçilmiş sahə tapılmasa
                contentDiv.innerHTML = "<p>Seçilmiş sahə haqqında məlumat tapılmadı.</p>";
            }
        })
        .catch(error => {
            console.error("Məlumat gətirilərkən xəta baş verdi:", error);
            document.getElementById("career-content").innerHTML = "<p>Məlumat yüklənərkən xəta baş verdi.</p>";
        });
});