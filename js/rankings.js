import { qsRankings } from './qs.js';

document.addEventListener('DOMContentLoaded', () => {
    const rankingSystemSelect = document.getElementById('rankingSystem');
    const yearSelect = document.getElementById('year');
    const countryFilter = document.getElementById('countryFilter');
    const rankingsBody = document.getElementById('rankingsBody');
    const itemsPerPageSelect = document.getElementById('itemsPerPage');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    let currentPage = 1;

    let currentData = [];
    let filteredData = [];

    async function fetchTheHigherData() {
        const response = await fetch('../js/thehigher.json');
        return await response.json();
    }

    function updateYearOptions(rankingSystem) {
        yearSelect.innerHTML = '';
        if (rankingSystem === 'qs') {
            Object.keys(qsRankings).forEach(year => {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            });
        } else if (rankingSystem === 'the-higher') {
            const option = document.createElement('option');
            option.value = '2025';
            option.textContent = '2025';
            yearSelect.appendChild(option);
        }
    }

    function updateCountryOptions(data) {
        const countries = [...new Set(data.map(uni => uni.country))].sort();
        countryFilter.innerHTML = '<option value="">Bütün Ölkələr</option>';
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            countryFilter.appendChild(option);
        });
    }

    function applyFilters() {
        const selectedCountry = countryFilter.value.toLowerCase();

        filteredData = currentData.filter(uni => {
            const matchesCountry = selectedCountry ? uni.country.toLowerCase() === selectedCountry : true;
            return matchesCountry;
        });

        currentPage = 1;
        updateTable(filteredData);
    }

    function updateTable(data) {
        const itemsPerPage = parseInt(itemsPerPageSelect.value) || 20;
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = data.slice(start, end);

        rankingsBody.innerHTML = '';

        if (data.length === 0) {
            rankingsBody.innerHTML = '<tr><td colspan="4">Məlumat yoxdur</td></tr>';
            return;
        }

        pageData.forEach(uni => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${uni.rank}</td>
                <td>${uni.name || uni.university}</td>
                <td>${uni.country}</td>
                <td>${uni.score || '-'}</td>
            `;
            rankingsBody.appendChild(row);
        });

        const totalPages = Math.ceil(data.length / itemsPerPage);
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
        currentPageSpan.textContent = `Səhifə ${currentPage} / ${totalPages}`;
    }

    async function updateRankings() {
        const selectedRanking = rankingSystemSelect.value;
        const selectedYear = yearSelect.value;

        if (selectedRanking === 'qs') {
            currentData = qsRankings[selectedYear] || [];
        } else if (selectedRanking === 'the-higher') {
            currentData = await fetchTheHigherData();
        }

        updateCountryOptions(currentData);
        applyFilters();
    }

    // Event listeners
    rankingSystemSelect.addEventListener('change', () => {
        updateYearOptions(rankingSystemSelect.value);
        updateRankings();
    });

    yearSelect.addEventListener('change', updateRankings);

    countryFilter.addEventListener('change', applyFilters);

    itemsPerPageSelect.addEventListener('change', () => {
        currentPage = 1;
        updateTable(filteredData);
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateTable(filteredData);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredData.length / parseInt(itemsPerPageSelect.value));
        if (currentPage < totalPages) {
            currentPage++;
            updateTable(filteredData);
        }
    });

    // Initial load
    updateYearOptions('qs');
    updateRankings();
});
