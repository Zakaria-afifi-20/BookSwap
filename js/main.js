// async function chargerDemandes() {
//   const reponse = await fetch('http://127.0.0.1:8000/api/v1/exchange-requests?status=open');
//   if (!reponse.ok) throw new Error(`Erreur HTTP ${reponse.status}`);
//   const resultat = await reponse.json();
//   console.log(resultat.data);
// }

// chargerDemandes();

//  let book = fetch('http://127.0.0.1:8000/api/v1/exchange-requests')
//            .then((res) => res.json())
//            .then((book) => console.log(book))  


async function chargerDemandes() {
  const reponse = await fetch('http://127.0.0.1:8000/api/v1/exchange-requests');
  if (!reponse.ok) throw new Error(`Erreur HTTP ${reponse.status}`);
  const resultat = await reponse.json();
  const datatable = resultat.data;
  affichage(datatable)
  recherche(datatable)
}



const cards = document.querySelector(".cards");


function affichage(data) {
  let cardsHtml = '';
  data.forEach(element => {
    let offersHtml = '';
    element.offers.forEach(offer => {
      offersHtml += `
      <div class="offered-book-item">
        <p>${offer.offered_book.title}</p>
      </div>
    `;
    });
    cardsHtml += `
    <div class="card">
        <div class="card-header">
          <span class="type">${element.exchange_type}</span>
          <span class="status">${element.status}</span>
        </div>
        <div class="books">
          <div class="book">
            <img src="http://127.0.0.1:8000${element.book.image_url}" alt="">
            <div>
              <h3>${element.book.title}</h3>
              <p>${element.book.author}</p>
            </div>
          </div>
          <div class="exchange-icon">⇄</div>
          <div class="no-offer">
            <span>${element.offers_count} offre(s)</span>
            <div class="offers-list"> ${offersHtml}</div>
          </div>
        </div>
        <div class="card-footer">
          <button>Voir détails →</button>
        </div>
      </div>
  `;
  });
  cards.innerHTML = cardsHtml;
}



function recherche(data) {
  const refreshBtn = document.getElementById('refreshBtn');

  refreshBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const nom = document.getElementById('searchInput');
    const msg = document.getElementById('searchresult')
    const nomvalue = nom.value;
    const typechange = document.getElementById('echangetype').value
    const livres = data.filter(livre => livre.book.title === nomvalue)
    if (nomvalue === "") {
      msg.textContent = "Le champ est vide"
      affichage(data)
    }
    if (livres.length === 0) {
      msg.textContent = "Livre introuvable"
      affichage(data)
    }
    else {
      if (typechange === "Tous") {
        affichage(livres)
      }
      if (typechange === "temporary") {
        const temporary = livres.filter(livre => livre.exchange_type === "temporary")
        affichage(temporary)
      }
      if (typechange === "permanent") {
        const permanent = livres.filter(livre => livre.exchange_type === "permanent")
        affichage(permanent)
      }
    }


  });
}



chargerDemandes();
































































//  data.forEach(element => {
//     cards.innerHTML += ` <div class="card">
//         <div class="card-header">
//           <span class="type">${element.exchange_type}</span>
//           <span class="status">${element.status}</span>
//         </div>
//         <div class="books">
//           <div class="book">
//             <img src="http://127.0.0.1:8000${element.book.image_url}" alt="${element.book.image_url}">
//             <div>
//               <h3>${element.book.title}</h3>
//               <p>${element.book.author}</p>
//               <span class="category">${element.book.category.name}</span>
//               <div class="tags">
//                  <span>#${element.book.tags[0]}</span>
//                  <span>#${element.book.tags[1]}</span>
//               </div>
//             </div>
//           </div>
//           <div class="exchange-icon">⇄</div>
//           <div class="no-offer">
//             <span>${element.offers_count} offre</span>
//             <p> </p>
//           </div>
//         </div>
//         <div class="card-footer">
//           <div class="owner">
//             <img src="http://127.0.0.1:8000${element.book.owner.avatar}"" alt="">
//             <div>
//               <h4>${element.book.owner.name}</h4>
//               <p>${element.book.owner.group_name}</p>
//             </div>
//           </div>
//           <button>Voir détails →</button>
//         </div>
//       </div>`;
