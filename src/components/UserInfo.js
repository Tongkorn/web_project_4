export default class UserInfo {
  constructor(profileTitleElement, profileSubtitleElement) {
    this.name = profileTitleElement;
    this.job = profileSubtitleElement;
  }

  getUserInfo() {
    const userInfo = {
      name: this.name.textContent,
      job: this.job.textContent
    }
    return userInfo;
  }

  setUserInfo(newUserData) {
    this.name.textContent = newUserData.name;
    this.job.textContent = newUserData.aboutme;
  }
}
