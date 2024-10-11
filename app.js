let allLinks = [];

const input = document.getElementById('input');
const inputBtn = document.getElementById('input-btn');
const tabBtn = document.getElementById('tab-btn');
const deleteBtn = document.getElementById('delete-btn');
const list = document.getElementById('list');

let getLiksFromLocalStoage = JSON.parse(localStorage.getItem('links'));
if (getLiksFromLocalStoage) {
  allLinks = getLiksFromLocalStoage;
  renderArr(allLinks);
}

function renderArr(arr) {
  list.innerHTML = '';
  arr.forEach(olText => {
    list.innerHTML += `
    
    <li><a href="" target="_blank">${olText}</a></li>
    `;
  });
}
inputBtn.addEventListener('click', () => {
  let link = input.value;
  allLinks.push(link);
  input.value = '';
  localStorage.setItem('links', JSON.stringify(allLinks));
  renderArr(allLinks);
});

deleteBtn.addEventListener('click', () => {
  localStorage.clear();
  allLinks = [];
  renderArr(allLinks);
});

tabBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0].url;
    localStorage.setItem('links', JSON.stringify(allLinks));
  })
});
