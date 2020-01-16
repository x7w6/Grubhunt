const resultsEl = document.getElementById('results');
const cityImgEl = document.getElementById('cityImage');
const Location = document.getElementById('cityInput');
const type = document.getElementById('type');
const restName = document.getElementById('restName');
const btn = document.getElementById('submit');

btn.onclick = () => {
  getData()
    // handle request errors
    .then(response => {
      console.log('it worked!');
    })
   // handle errors
   .catch(error => {
      console.log('Oops, looks like an error!');
      console.error(error);
      resultsEl.innerHTML = 'Oops, something went wrong!';
      resultsEl.classList = 'teit-danger';
   });
};

// Get Data
async function getData() {
  const url = `https://developers.zomato.com/api/v2.1/search?q=${Location.value}&category=${type.value}`;
  const response = await fetch(url, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'user-key': '485429cffaa76eb2f7d854a09ea2cc52'
    }
  });

  const jsonRes = await response.json();
  console.log(jsonRes);

  // array of all restaurants listed
  const restaurants = jsonRes.restaurants;
  console.log(restaurants);

  // create row
  const row = document.createElement('div');
  document.getElementById('test').appendChild(row);
  row.className = "row";

  // parse arrays 
  const count = restaurants.length;

  for(let i = 0; i < count; i++) {
    const restName = restaurants[i].restaurant.name;
    const hours = "Hours: " + restaurants[i].restaurant.timings;
    const link = restaurants[i].restaurant.url;
    const address = restaurants[i].restaurant.location.address;

      // for debug
      console.log(restName);
    const br = document.createElement('br');

    const col = document.createElement('div');
    col.className = "col-sm-12 col-md-6 mb-4";

    const anchor = document.createElement('a');
    anchor.href = link;

    const card = document.createElement('div');
    card.className = "card text-center";

    const cardBody = document.createElement('div');
    cardBody.className = "card-body";

    const heading = document.createElement('h4');
    heading.className = "card-title";

    const cardText = document.createElement('p');
    cardText.className = "card-text";

    row.append(col);
    col.append(anchor);
    anchor.append(card);
    card.append(cardBody);
    cardBody.append(heading);
    cardBody.append(cardText);
    heading.append(restName);
    cardText.append(hours);
    cardBody.append(br);
    cardBody.append(address);
  };

  resultsEl.innerHTML = jsonRes.results_shown;

  // handle result errors
  if (jsonRes.results_found == 0) {
    resultsEl.innerHTML = 'No restaurants found, try again!' ;
    resultsEl.classList = 'text-danger';
  } else {
    Location.classList.add('text-success');
    resultsEl.classList = 'text-success';
  };
};