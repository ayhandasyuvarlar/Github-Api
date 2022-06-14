/// Element Select

const githubForm = document.getElementById('github-form')
const nameInput = document.getElementById('githubname')
const clearLastUsers = document.getElementById('clear-last-users')
const lastUsers = document.getElementById('last-users')
const github = new Github()
eventListeners()
const ui = new UI()

function eventListeners() {
  githubForm.addEventListener('submit', getData)
  clearLastUsers.addEventListener('click', clearAllSearched)
  document.addEventListener('DOMContentLoaded', getAllSearched)
}

function getData(e) {
  let userName = nameInput.value.trim()
  if (userName === '') {
    alert('Please, enter a valid username.')
  } else if (userName === null) {
    alert('Please enter a valid username.')
  } else {
    github
      .getGithubData(userName)
      .then((response) => {
        if (response.user.message === 'Not Found') {
          ui.showError('No such user found')
        } else {
          ui.addSearchedUserToUI(userName);
          Storage.addSearchedUserToStorage(userName)
          ui.showUserInfo(response.user)
          ui.showRepoInfo(response.repo)
        }
      })
      .catch((err) => ui.showError('No such user found'))
  }
  ui.clearInput()
  e.preventDefault()
}

function clearAllSearched() {
  if(confirm("Emin misiniz ?")){
    Storage.clearAllSearchedUsersFromStorage();
    ui.clearAllSearchedFromUI()
  }
}

function getAllSearched() {
  let result = ""
  let users = Storage.getSearchUsersFormStorage()
  users.forEach(user => {
        result += `
        <li class="list-group-item">${user}</li>`
  })
  lastUsers.innerHTML = result;
}
