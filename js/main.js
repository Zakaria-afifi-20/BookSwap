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
  actualiser(datatable)
  recherche(datatable)
  changeoffers(datatable)
}

function createdate(dateString) {
  return dateString.split('T')[0];
}


const cards = document.querySelector(".cards");

function affichage(data) {
  let cardsHtml = '';
  data.forEach(element => {
    let offersHtml = '';
    element.offers.forEach(offer => {
      offersHtml += `
      <div class="offered-book-item">
        <p>${offer.offered_book.title} => (${offer.status}) </p>
      </div>
    `;
    });
    cardsHtml += `
    <div class="card">
        <div class="card-header">
          <span class="type">${element.exchange_type}</span>
         <p> <b>Creer le : </b>${createdate(element.created_at)}</p>
          <span class="status">${element.status}</span>
        </div>
        <div class="books">
          <div class="book">
            <img src="http://127.0.0.1:8000${element.book.image_url}" alt="">
            <div>
              <h3>${element.book.title}</h3>
              <p>${element.book.author}</p>
              <p> <b>Description : </b>${element.book.description}</p>
              <p> <b>Category : </b>${element.book.category.slug}</p>
              <p> <b>tags : </b> #${element.book.tags[0]}  #${element.book.tags[1]} </p>
            </div>
          </div>
          <div class="exchange-icon">⇄</div>
          <div class="no-offer">
            <span>${element.offers_count} offre(s)</span>
            <div class="offers-list"> ${offersHtml}</div>
          </div>
        </div>
        <div class="card-footer">
          <button data-id= ${element.id} class="detailbtn">Voir détails →</button>
           <div class="change"></div>
        </div>
      </div>
  `;
  });
  cards.innerHTML = cardsHtml;
}
function actualiser (data){
  const actualiserbtn = document.getElementById('actualiserBtn')
  actualiserbtn.addEventListener("click", (e) => {
    affichage(data)
  })
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



function changeoffers(data) {
  const detailbtn = document.querySelectorAll('.detailbtn');

  detailbtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const booktarget = e.currentTarget.getAttribute('data-id');
      const bookid = data.find((book) => book.id == booktarget);
      const cardFooter = e.currentTarget.closest('.card-footer');
      const divoffer = cardFooter.querySelector('.change');
      console.log(bookid);
      
      if (divoffer.innerHTML.trim() !== '') {
        divoffer.innerHTML = '';
        return;
      }
      const offeraccept = bookid.offers.find((offer) => offer.status === "accepted");

      divoffer.innerHTML = '';

      if (offeraccept && offeraccept.offered_book) {
         divoffer.innerHTML += `
           <div class="card">
              <div class="books">
                <div class="book">
                  <img src="http://127.0.0.1:8000${offeraccept.offered_book.image_url || ''}" alt="">
                  <div>
                    <h3>${offeraccept.offered_book.title}</h3>
                    <p>${offeraccept.offered_book.author}</p>
                  </div>
                </div>
                <div class="no-offer">
                  <span></span>
                </div>
           </div>
         </div>
         `;
      } else {
         divoffer.innerHTML = `<p>Aucun offer accepter</p>`;
      }
    });
  });
}





chargerDemandes();



































































