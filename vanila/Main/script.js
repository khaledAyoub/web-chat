// constact info close button

const closeButton = document.querySelector(".close");
const contactInfo = document.querySelector(".contactinfo");
const chatmenu = document.querySelector(".chatcontainer");
const chatheader = document.querySelector(".currentuserheader");
const chat = document.querySelector(".currentusermain");

console.log(contactInfo);

// add event listener to close button

closeButton.addEventListener("click", () => {
  contactInfo.classList.add("hide");
  contactInfo.classList.remove("show");
});
chat.addEventListener("click", () => {
  contactInfo.classList.add("hide");
  contactInfo.classList.remove("show");
});

// show profile information

const imageAndUserName = document.querySelector(".headerleft");

imageAndUserName.addEventListener("click", () => {
  contactInfo.classList.add("show");
  contactInfo.classList.remove("hide");
});
