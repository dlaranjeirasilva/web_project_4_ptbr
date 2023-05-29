export default class UserInfo {
  constructor({ nameSelector, aboutMeSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutMeElement = document.querySelector(aboutMeSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      aboutMe: this._aboutMeElement.textContent,
    };
  }

  setUserInfo({ name, aboutMe }) {
    this._nameElement.textContent = name;
    this._aboutMeElement.textContent = aboutMe;
  }
}
