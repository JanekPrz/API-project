//Hämtar elementen från HTML-filen
const navBar = document.getElementById("navBar")
const input = document.getElementById("search")
const searchButton = document.getElementById("button")
const list = document.getElementById("mealList")
//Lägger in elementen i klasser som kan redigeras i CSS
list.classList.add("listC")
searchButton.classList.add("buttonC")
input.classList.add("inputC")

//1. Event för när man trycker på sökknappen
searchButton.addEventListener("click", async() => { //Async gör funktionen asynkron och kan då lägga in "await"
  list.innerHTML = "" //"Rensar" resultatet så att det gamla resultatet inte stannar
  const query = input.value.trim() //Query blir det man skriver in i sökrutan. Trim tar bort onödiga mellanslag som man kan råka skriva in. " Chicken" blir "Chicken", "" blir null etc.
  if (!query){ //Skapar en if-sats för om man inte skriver in någonting och trycker på sökknappen
    list.innerHTML = "Skriv något i sökfältet" //Det som resultatet visar
    return; //Avslutar funktionen här. Koden under körs inte
  }

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`) //Hämtar datan från API:n
  const data = await res.json() //Konverterar resultatet från fetchrequesten till ett JSON-objekt som i sin tur kan redigeras i JS
  const meals = data.meals //Datan som vi fått från fetchrequesten

  if (!data.meals){ //Skapar en if-sats för om inget resultat hittas
    list.innerHTML = "Inga resultat hittades"
  }

  //2. Här är då funktionen för resultatet som visas om det man söker efter finns
  data.meals.forEach(meal => { //En funktion som loopar och går igenom varenda måltid
    const div = document.createElement("div") //Ett nytt elemenet skapas för varje måltid som hittas
    div.classList.add("mealC") //Klass för varenda måltid som kan redigeras i CSS
    div.innerHTML =`
      <img src= "${meal.strMealThumb}" <!-- Hämtar bild på varenda måltid från API:n-->
      <h3>${meal.strMeal}</h3> <!--Hämtar måltidsnamnen-->
      <p>Category: ${meal.strCategory}</p> <!--Hämtar måltidskategorin-->
    `
    list.appendChild(div) //Lägger in alla måltider i resultatlist-elementet vi skapade tidigare


  })


} )



