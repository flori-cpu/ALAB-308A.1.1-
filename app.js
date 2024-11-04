const API_URL = 'https://calendarific.com/api/v2/holidays';
const API_KEY = 'w8bHEXBEjRkuika5wfmAGdYa0LlFs4d9';

async function fetchHolidays(country, date) {
    const [year] = date.split('-');

    try {
        const response = await fetch(`${API_URL}?api_key=${API_KEY}&country=${country}&year=${year}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); 
        return data.response.holidays;
    } catch (error) {
        console.error('Error fetching holidays:', error.message);
    }
}

function displayHolidays(holidays) {
    const holidayList = document.getElementById('holiday-list');
    holidayList.innerHTML = '';

    if (!holidays || holidays.length === 0) {
        holidayList.innerHTML = '<p>No holidays found for this date.</p>';
        return;
    }

    holidays.forEach(holiday => {
        const holidayCard = document.createElement('div');
        holidayCard.className = 'holiday-card';
        holidayCard.innerHTML = `
            <h3>${holiday.name}</h3>
            <p>Date: ${holiday.date.iso}</p>
            <p>Description: ${holiday.description || 'No description available'}</p>
            <button data-name="${holiday.name}" class="save-btn">Save Holiday</button>
        `;
        holidayList.appendChild(holidayCard);

        holidayCard.querySelector('.save-btn').addEventListener('click', () => {
            saveHoliday(holiday);
            displayFavorites();
        });
    });
}

async function init() {
    document.getElementById('search-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const country = document.getElementById('country').value.toUpperCase();
        const date = document.getElementById('date').value;
        
        const holidays = await fetchHolidays(country, date);
        if (holidays) {
            displayHolidays(holidays);
        }
    });

    displayFavorites();
}

init();
