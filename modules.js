
import { saveHoliday } from './api.js';

export function displayHolidays(holidays) {
    const holidayList = document.getElementById('holiday-list');
    holidayList.innerHTML = '';

    holidays.forEach(holiday => {
        const holidayCard = document.createElement('div');
        holidayCard.className = 'holiday-card';
        holidayCard.innerHTML = `
            <h3>${holiday.name}</h3>
            <p>Date: ${holiday.date.iso}</p>
            <button data-name="${holiday.name}" class="save-btn">Save Holiday</button>
        `;
        holidayList.appendChild(holidayCard);

        holidayCard.querySelector('.save-btn').addEventListener('click', () => {
            saveHoliday(holiday);
            displayFavorites();
        });
    });
}

export function displayFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favoritesList.innerHTML = '';

    favorites.forEach(fav => {
        const listItem = document.createElement('li');
        listItem.textContent = `${fav.name} - ${fav.date.iso}`;
        favoritesList.appendChild(listItem);
    });
}
