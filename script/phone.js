const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones,isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = '';

  const showAllContainer = document.getElementById('show-all-container');
  if(phones.length > 12 && !isShowAll){
    showAllContainer.classList.remove('hidden');
  }else{
    showAllContainer.classList.add('hidden');
  }

  if(!isShowAll){
    phones =phones.slice(0,12);
  }

  phones.forEach((phone) => {
    console.log(phone);
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 p-6 shadow-xl mt-8`;
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}"
    alt="" /></figure>
    <div class="card-body">
        <h1 class="text-3xl font-bold">${phone.brand}</h1>
        <h2 class="card-title">${phone.phone_name}</h2>
        <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">SHOW DETAILS</button>
        </div>
    </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

const handleShowDetail = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json();
  const phone = data.data; 
  showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
  const phoneName = document.getElementById('show-detail-phone-name');
  phoneName.innerText = phone.name;
  const showDetailContainer = document.getElementById('show-detail-container');
  showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <p><span class="font-bold">Storage:</span> ${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold">Display Size:</span> ${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold">ChipSet:</span> ${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-bold">Memory:</span> ${phone?.mainFeatures?.memory}</p>
    <p><span class="font-bold">Release Date:</span> ${phone?.mainFeatures?.releaseDate}</p>
    <p><span class="font-bold">GPS:</span> ${phone?.others?.GPS}</p>  
  `
  show_details_modal.showModal();
}

const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isLoading){
    loadingSpinner.classList.remove('hidden');
  }else{
    loadingSpinner.classList.add('hidden');
  }
}

const handleShowAll = () => {
  handleSearch(true);
}

loadPhone("iphone");
