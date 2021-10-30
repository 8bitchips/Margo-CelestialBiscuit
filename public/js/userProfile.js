let but = document.querySelector(".but");
let editModal = document.querySelector(".modal .editBtn");
let saveModal = document.querySelector(".modal .saveBtn");
let cancelModal = document.querySelector(".modal .ProfilecancelBtn");
let closeModal = document.querySelector(".modal .ProfilecloseBtn");
let inputModal = document.querySelectorAll(".modal input");
let modal = document.querySelector(".modal");
let people = document.querySelector(".people");
let information = document.querySelector(".information");
let personalDetails = document.querySelector(".personal-details");
let lovedOnes = document.querySelector(".lovedOnes");
let colInfoDiv = document.querySelector(".info-div");
let colPD = document.querySelector(".personalDetails-div");
let colLoved = document.querySelector(".lovedOnes-div");
information.addEventListener("click", showInfoDiv);
personalDetails.addEventListener("click", showPersonalDetails);
lovedOnes.addEventListener("click", showLovedOnesDiv);

function showInfoDiv() {
  colInfoDiv.style.display = "block";
  colPD.style.display = "none";
  colLoved.style.display = "none";
}
function showPersonalDetails() {
  colInfoDiv.style.display = "none";
  colPD.style.display = "block";
  colLoved.style.display = "none";
}
function showLovedOnesDiv() {
  colInfoDiv.style.display = "none";
  colPD.style.display = "none";
  colLoved.style.display = "block";
}

but.addEventListener("click", addLovedOnes);

function addLovedOnes() {
  modal.style.display = "flex";
  editModal.style.display = "none";
  cancelModal.style.display = "flex";
  saveModal.style.display = "flex";
  closeModal.style.display = "none";
  for (let i = 0; i < inputModal.length; i++) {
    inputModal[i].disabled = false;
  }
}
saveModal.addEventListener("click", setLovedOne);

function setLovedOne() {
  let reader = new FileReader();
  reader.onload = function (e) {
    let aadmi = document.createElement("div");
    aadmi.innerHTML = `
    <div class="pic"><img src="${e.target.result}" alt="" srcset=""></div>
    <div class="name-people">${inputModal[0].value}</div>
    `;
    aadmi.classList.add("aadmi1");
    people.appendChild(aadmi);
    modal.style.display = "none";

    aadmi.addEventListener("click", function () {
      modal.style.display = "flex";
      editModal.style.display = "flex";
      cancelModal.style.display = "none";
      saveModal.style.display = "none";
      closeModal.style.display = "flex";
      inputModal[0].value = inputModal[0].value;
      inputModal[1].value = inputModal[1].value;
      inputModal[2].value = inputModal[2].value;
      inputModal[3].value = inputModal[3].value;
      inputModal[4].value = inputModal[4].value;
      inputModal[5].parentNode.style.display = "none";

      for (let i = 0; i < 5; i++) {
        inputModal[i].disabled = true;
      }
    });
  };
  reader.readAsDataURL(inputModal[5].files[0]);
}
cancelModal.addEventListener("click", closeKrdoModal);
closeModal.addEventListener("click", closeKrdoModal);
function closeKrdoModal() {
  modal.style.display = "none";
  inputModal[0].value = "";
  inputModal[1].value = "";
  inputModal[2].value = "";
  inputModal[3].value = "";
  inputModal[4].value = "";
}
