const container = document.querySelector(".fetchedData");
const countriesOptions = document.querySelector("#country");
const checkboxCheked = document.querySelector("#btnNextOne");

const getData = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.data.length > 0) {
      return data.data;
    }
    alert("Issue");
  } catch (err) {
    alert(err);
  }
};

// Pirma išoka checkbox’ai, kuriuos vartotojas gali pasirinkti – informaciją išsaugome į localStorage.

const createCheckbox = async () => {
  const data = await getData("http://18.193.250.181:1337/api/activities");

  data.forEach((item) => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = item.id;
    checkbox.name = item.attributes.title;
    const label = document.createElement("label");
    label.htmlFor = item.attributes.title;
    label.appendChild(document.createTextNode(`${item.attributes.title}`));
    const br = document.createElement("br");
    container.appendChild(checkbox);
    container.appendChild(label);
    label.appendChild(br);
  });
};
createCheckbox();

checkboxCheked.addEventListener("click", () => {
  const checkedBoxes = Array.from(
    container.querySelectorAll('input[type="checkbox"]:checked')
  );
  if (checkedBoxes.length > 0) {
    let myArr = [];
    checkedBoxes.forEach((checkbox) => {
      myArr.push(checkbox.id);
    });
    localStorage.setItem("title", myArr);
    // display second section, hide the first
    firstContainerDisable = document.querySelector(
      ".displayOne"
    ).style.display = "none";
    secondContainerDisable = document.querySelector(
      ".displayTwo"
    ).style.display = "flex";
  } else {
    alert("Please select what do you usually do after work?");
  }
});

// Antra dalis, kurioje vartotojas suveda savo duomenis, pasiimame info iš localStorage ir siunčiame į back-end‘ą – išsaugome ID.

const createOptions = async () => {
  const data = await getData("http://18.193.250.181:1337/api/countries");
  console.log(data);

  data.forEach((country) => {
    const selectOption = document.createElement("option");
    selectOption.value = country.attributes.country;
    selectOption.id = country.id;
    selectOption.textContent = country.attributes.country;
    countriesOptions.append(selectOption);
  });
};
createOptions();

const postPeople = async (valueFromForm) => {
  try {
    const res = await fetch("http://18.193.250.181:1337/api/people", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: valueFromForm }),
    });
    const data = await res.json();
    localStorage.setItem("test", data.data.id);
    addToThird();

    console.log(data);
  } catch (err) {
    alert(err);
  }
};

document.forms.peopleForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const first_name = e.target.first_name.value.trim();
  const last_name = e.target.last_name.value.trim();
  const email = e.target.email.value.trim();
  let countryIndex = e.target.country.options[country.selectedIndex].id;
  countryIndex = countryIndex.slice(countryIndex.length - 1);

  console.log(countryIndex, first_name, last_name, email);

  const activities = localStorage.getItem("title").split(",");

  const person = {
    first_name,
    last_name,
    email,
    country: countryIndex,
    activities,
  };

  try {
    postPeople(person);
    firstContainerDisable = document.querySelector(
      ".displayTwo"
    ).style.display = "none";
    secondContainerDisable = document.querySelector(
      ".displayThree"
    ).style.display = "flex";
  } catch (err) {
    alert(err);
  }
});

// Trečia dalis – pagal ID išsiunčiame query į back-end‘ą ir atvaizduojame gautus duomenis ir paklausiame ar jie teisingi – jei ne, ištrinam duomenis.

const addToThird = async () => {
  const data = await getData(
    `http://18.193.250.181:1337/api/people?populate=*&filters[id][$eq]=${localStorage.getItem(
      "test"
    )}`
  );
  const personNameEl = document.querySelector("#nameThird");
  const personSurnameEl = document.querySelector("#surnameThird");
  const personEmailEl = document.querySelector("#emailThird");
  const personCountryEl = document.querySelector("#countryThird");

  const personName = document.createElement("p");
  const personSurname = document.createElement("p");
  const personEmail = document.createElement("p");
  const personCountry = document.createElement("p");

  personName.textContent = data[0].attributes.first_name;
  personSurname.textContent = data[0].attributes.last_name;
  personEmail.textContent = data[0].attributes.email;
  personCountry.textContent =
    data[0].attributes.country.data.attributes.country;

  personNameEl.append(personName);
  personSurnameEl.append(personSurname);
  personEmailEl.append(personEmail);
  personCountryEl.append(personCountry);
};

const deletePerson = async (test) => {
  console.log(test);
  try {
    const res = await fetch(`http://18.193.250.181:1337/api/people/${test}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    alert(err);
  }
};

document.querySelector("#btnNo").addEventListener("click", () => {
  deletePerson(localStorage.getItem("test"));
  alert("Person info was deleted!");
  firstContainerDisable = document.querySelector(".displayTwo").style.display =
    "flex";
  secondContainerDisable = document.querySelector(
    ".displayThree"
  ).style.display = "none";
});

// Ketvirta dalis – success message.

document.querySelector("#btnYes").addEventListener("click", () => {
  firstContainerDisable = document.querySelector(
    ".displayThree"
  ).style.display = "none";
  secondContainerDisable = document.querySelector(
    ".displayFour"
  ).style.display = "flex";
  alert("Succeed");
});
