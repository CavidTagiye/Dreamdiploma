document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const universityId = urlParams.get('id');

    if (!universityId) {
        document.getElementById('universityName').textContent = 'Universitet tapılmadı';
        document.getElementById('universityDescription').textContent = 'Bu səhifə üçün məlumat mövcud deyil.';
        return;
    }

    fetch('./university.json')
        .then(response => response.json())
        .then(data => {
            const university = data.find(uni => uni.name.toLowerCase().includes(universityId));

            if (university) {
                // Universitetin əsas məlumatlarını doldurun
                document.getElementById('universityName').textContent = university.name;
                document.getElementById('universityDescription').textContent = university.overview;

                // Statistik məlumatlar
                const statsContainer = document.getElementById('universityStats');
                const stats = [
                    { label: 'Təsis ili', value: university.founded },
                    { label: 'Növü', value: university.type },
                    { label: 'Endowment', value: university.endowment },
                    { label: 'Şəhər', value: university.location.city },
                    { label: 'Ştat', value: university.location.state },
                    { label: 'Ölkə', value: university.location.country }
                ];
                stats.forEach(stat => {
                    const li = document.createElement('li');
                    li.innerHTML = `<span>${stat.label}:</span> ${stat.value}`;
                    statsContainer.appendChild(li);
                });

                // Qəbul Məlumatları
                const admissionsContainer = document.createElement('div');
                admissionsContainer.innerHTML = `
                    <h3>Qəbul Məlumatları</h3>
                    <p><strong>Qəbul Faizi:</strong> ${university.admissions.acceptance_rate}</p>
                    <p><strong>Son Müraciət Tarixi:</strong> ${university.admissions.application_deadline}</p>
                    <p><strong>Müraciət Ödənişi:</strong> ${university.admissions.application_fee}</p>
                    <p><strong>Standart Testlər:</strong> ${university.admissions.standardized_tests.required ? 'Tələb olunur' : 'Tələb olunmur'}</p>
                    <p><strong>Orta SAT:</strong> ${university.admissions.standardized_tests.average_scores.SAT || 'Məlumat mövcud deyil'}</p>
                    <p><strong>Orta ACT:</strong> ${university.admissions.standardized_tests.average_scores.ACT || 'Məlumat mövcud deyil'}</p>
                    <p><strong>IELTS:</strong> ${university.admissions.standardized_tests.average_scores.IELTS || 'Məlumat mövcud deyil'}</p>
                    <p><strong>TOEFL:</strong> ${university.admissions.standardized_tests.average_scores.TOEFL || 'Məlumat mövcud deyil'}</p>
                    <p><strong>GRE:</strong> ${university.admissions.standardized_tests.average_scores.GRE || 'Məlumat mövcud deyil'}</p>
                    <p><strong>GMAT:</strong> ${university.admissions.standardized_tests.average_scores.GMAT || 'Məlumat mövcud deyil'}</p>
                    <ul>
                        ${university.admissions.required_documents.map(doc => `<li>${doc}</li>`).join('')}
                    </ul>
                    <a href="${university.admissions.application_link}" target="_blank" class="button">Müraciət Et</a>
                `;
                statsContainer.appendChild(admissionsContainer);

                // Təhsil Haqqı və Maliyyə Yardımı
                const tuitionContainer = document.createElement('div');
                tuitionContainer.innerHTML = `
                    <h3>Təhsil Haqqı və Maliyyə Yardımı</h3>
                    <p><strong>Bakalavr Təhsil Haqqı:</strong> ${university.tuition.undergraduate}</p>
                    <p><strong>Ümumi Xərclər:</strong> ${university.tuition.total_cost}</p>
                    <p><strong>Maliyyə Yardımı:</strong> ${university.tuition.financial_aid.overview}</p>
                    <p><strong>Orta Ailə Töhfəsi:</strong> ${university.tuition.financial_aid.average_family_contribution}</p>
                    <ul>
                        ${university.tuition.financial_aid.grants.map(grant => `
                            <li>
                                <strong>${grant.name}:</strong> ${grant.amount} (${grant.eligibility})
                            </li>
                        `).join('')}
                    </ul>
                    <a href="${university.tuition.financial_aid.financial_aid_link}" target="_blank" class="button">Maliyyə Yardımı Məlumatı</a>
                `;
                statsContainer.appendChild(tuitionContainer);

                // Akademik Proqramlar
                const academicsContainer = document.createElement('div');
                academicsContainer.innerHTML = `
                    <h3>Akademik Proqramlar</h3>
                    <p><strong>Bakalavr Proqramları:</strong> ${university.academics.undergraduate_programs.join(', ')}</p>
                    <p><strong>Magistr və Doktorantura Proqramları:</strong> ${university.academics.graduate_programs.join(', ')}</p>
                    <p><strong>Məşhur Kurslar:</strong> ${university.academics.notable_courses.join(', ')}</p>
                    <p><strong>Akademik Təqvim:</strong> ${university.academics.academic_calendar}</p>
                    <p><strong>Tələbə-Fakültə Nisbəti:</strong> ${university.academics.student_faculty_ratio}</p>
                    <a href="${university.academics.academics_link}" target="_blank" class="button">Daha Ətraflı</a>
                `;
                statsContainer.appendChild(academicsContainer);

                // Tələbə Həyatı
                const studentLifeContainer = document.createElement('div');
                studentLifeContainer.innerHTML = `
                    <h3>Tələbə Həyatı</h3>
                    <p><strong>Yataqxana:</strong> ${university.student_life.housing.system} (${university.student_life.housing.guarantee})</p>
                    <p><strong>Klublar və Təşkilatlar:</strong> ${university.student_life.clubs_and_organizations}</p>
                    <p><strong>İdman:</strong> ${university.student_life.athletics.division} (${university.student_life.athletics.teams})</p>
                    <p><strong>Səhiyyə Xidmətləri:</strong> ${university.student_life.health_services}</p>
                    <a href="${university.student_life.student_life_link}" target="_blank" class="button">Daha Ətraflı</a>
                `;
                statsContainer.appendChild(studentLifeContainer);

                // Məşhur Məzunlar
                const alumniContainer = document.createElement('div');
                alumniContainer.innerHTML = `
                    <h3>Məşhur Məzunlar</h3>
                    <ul>${university.notable_alumni.map(alumni => `<li>${alumni}</li>`).join('')}</ul>
                `;
                statsContainer.appendChild(alumniContainer);

                // Kitabxanalar və Muzeylər
                const librariesContainer = document.createElement('div');
                librariesContainer.innerHTML = `
                    <h3>Kitabxanalar</h3>
                    <ul>${university.libraries.map(library => `<li>${library}</li>`).join('')}</ul>
                `;
                statsContainer.appendChild(librariesContainer);

                const museumsContainer = document.createElement('div');
                museumsContainer.innerHTML = `
                    <h3>Muzeylər</h3>
                    <ul>${university.museums.map(museum => `<li>${museum}</li>`).join('')}</ul>
                `;
                statsContainer.appendChild(museumsContainer);

                // Tədqiqat Sahələri və Layihələr
                const researchContainer = document.createElement('div');
                researchContainer.innerHTML = `
                    <h3>Tədqiqat</h3>
                    <p><strong>Əsas Sahələr:</strong> ${university.research.focus_areas.join(', ')}</p>
                    <p><strong>Məşhur Layihələr:</strong> ${university.research.notable_projects.join(', ')}</p>
                `;
                statsContainer.appendChild(researchContainer);

                // Əlaqə Məlumatları
                const contactContainer = document.createElement('div');
                contactContainer.innerHTML = `
                    <h3>Əlaqə</h3>
                    <p><strong>Ünvan:</strong> ${university.contact.address}</p>
                    <p><strong>Telefon:</strong> ${university.contact.phone}</p>
                    <p><strong>Email:</strong> <a href="mailto:${university.contact.email}">${university.contact.email}</a></p>
                `;
                statsContainer.appendChild(contactContainer);

                // Sosial Media
                const socialMediaContainer = document.createElement('div');
                socialMediaContainer.innerHTML = `
                    <h3>Sosial Media</h3>
                    <p><a href="${university.website}" target="_blank">Website</a></p>
                    <p><a href="${university.social_media.facebook}" target="_blank">Facebook</a></p>
                    <p><a href="${university.social_media.linkedin}" target="_blank">LinkedIn</a></p>
                `;
                statsContainer.appendChild(socialMediaContainer);
            } else {
                document.getElementById('universityName').textContent = 'Universitet tapılmadı';
                document.getElementById('universityDescription').textContent = 'Bu universitet haqqında məlumat mövcud deyil.';
            }
        })
        .catch(error => console.error('Məlumat yüklənərkən xəta baş verdi:', error));
});