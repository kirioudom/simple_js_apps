function modalHandler() {
  const modalElement = document.querySelector("#modal");
  const backdrop = document.querySelector("#backdrop");

  const modalTrigger = () => {
    modalElement.classList.toggle("open-modal");
    backdrop.classList.toggle("open-modal");
    //click on bookmark btn open backdrop and modal
    //click on backdrop close the backdrop and modal
  };

  backdrop.addEventListener("click", (e) => {
    modalTrigger();
  });

  return modalTrigger;
}

function formHandler() {
  const formElement = document.querySelector("#formSubmit");

  const 
}

window.onload = () => {
  const modalTrigger = modalHandler();
  document.querySelector("#btn-bookmark").addEventListener("click", (e) => {
    modalTrigger();
  });
};
