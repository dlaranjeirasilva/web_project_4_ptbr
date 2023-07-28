export default class UserInfo {
  constructor({ nameSelector, aboutMeSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutMeElement = document.querySelector(aboutMeSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      aboutMe: this._aboutMeElement.textContent,
      avatar: this._avatarElement,
    };
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._aboutMeElement.textContent = userData.about;
    this._avatarElement.setAttribute('src', `${userData.avatar}`);
  }
}
