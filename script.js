// const apiURL = "https://data.fixer.io/api/latest?access_key=9fff6f6de194911b300762c654405c35&base=USD";

const apiURL = 'https://data.fixer.io/api/latest?access_key=9fff6f6de194911b300762c654405c35';

const options = {
  method: "GET",
};

async function getRates() {
  try {
    const response = await fetch(apiURL, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    // const data = await response.json();

    if (result.success) {
      const rates = result.rates;
      //console.log('Exchange Rates: ', rates)
      return rates;
    } else {
      console.log('API Request Failed: ', result);
      return null;
    }

    //console.log(result);

  } catch (error) {
    console.log(error);
    return null;
  }
}

function withCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

function onclickevent() {

  var amount = document.getElementById("money");
  var text0 = document.getElementById("text0").value;
  var text1 = document.getElementById("text1").value.toUpperCase();
  var text2 = document.getElementById("text2").value.toUpperCase();
  var display = document.getElementById("rate");

  // console.log(text0);
  // console.log(text1);
  // console.log(text2);

  getRates().then(rates => {
    // if (rates) {
    //   console.log("GOT RATES");
    //   console.log(rates);

      // if (text1 == "EUR") {
      //   for (let key in rates) {
      //     if (key == text2) {
      //       var val = text0 * rates[key];
      //       amount.textContent = `$${withCommas(val.toFixed(2))} ${key2}`;
      //       display.textContent = `1 EUR = ${rates[key]} ${key}`;
      //       break;
      //     }
      //   }
      // } else {
      for (let key in rates) {
        if (key == text1) {
          for (let key2 in rates) {
            if (key2 == text2) {
              var rate1 = rates[key];
              var rate2 = rates[key2];
              var val = (text0 / rate1) * rate2;
              //var val = text0 / rates[key2];
              amount.textContent = `$${withCommas(val.toFixed(2))} ${key2}`;
              var calc = (1/rate1) * rate2;
              display.textContent = `1 ${key} = ${calc.toFixed(4)} ${key2}`;
              break;
            }
          }
        }
      }
      // }
    // } else {
    //   console.log("FAILED TO GET RATES");
    // }
  });

  // const rates = getRates();
  // console.log(rates);

}
let myArray = [];

function submit() {

  getRates().then(rates => {
    for (let key in rates) {
      var checkbox = document.getElementById(`${key}`);
      if (checkbox.checked) {
        console.log(checkbox.value);
        if (!myArray.includes(checkbox.value)) {
          myArray.push(checkbox.value);
          const newDiv = document.createElement(`div${key}`);
          var val = 1/ (rates[key]);
          newDiv.innerHTML = `<p>${key} = ${val.toFixed(4)} </p>`;
          newDiv.id = `div${key}`;
          const parentElement = document.getElementById("parentDiv");
          parentElement.appendChild(newDiv);
        } else if (myArray.includes(checkbox.value)) {
          const element = document.getElementById(`div${key}`);
          element.remove();
        }
      }
    }


    // for(let i = 0; i < myArray.length; i++){



    // }

    const checkboxes = document.querySelectorAll('#myForm input[type="checkbox"]');

    checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
    });

  });

}



