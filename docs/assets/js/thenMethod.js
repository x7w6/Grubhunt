function getData() {
    let Location = cityInput.value;
    const url = `https://developers.zomato.com/api/v2.1/search?q=${Location}&count=20`;
    fetch(url, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'user-key': '485429cffaa76eb2f7d854a09ea2cc52'
      }
    }) // end of fetch() function
    // get response from fetch
    .then(response => {
      console.log(response);
      return response.json();
    })
    // get json from response
    .then(json => {
      console.log(json);
      resultsEl.innerHTML = json.results_found;
      if (json.results_found == 0) {
        resultsEl.innerHTML = 'No restaurants found, try again!' ;
        resultsEl.classList = 'text-danger';
      }
    })
    //error handling
    .catch(error => {
      console.log('Oops something went wrong!');
      console.error(error);
    })
  }; 