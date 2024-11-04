const API_URL = 'https://calendarific.com/api/v2/holidays';
 const API_KEY = 'w8bHEXBEjRkuika5wfmAGdYa0LlFs4d9';

  export async function fetchHolidays(country, date) 
  { const [year] = date.split('-');
    
     const response = await fetch(`${API_URL}api_key=${API_KEY}&country=${country}&year=${year}`); 
     if (!response.ok) {
        throw new Error (`HTTP  error! status:  ${response.status}`) ;
     }
    const data = await response.json(); response.json () ;
    return data.response.holidays ;


} 
catch (error) {
    console.error('Error fetching holidays:' , error message ) ;
}
    

}
 