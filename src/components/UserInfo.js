export default class UserInfo {
  constructor(profileTitleElement, profileSubtitleElement, profileAvatarElement) {
    this.name = profileTitleElement;
    this.job = profileSubtitleElement;
    this.avatar = profileAvatarElement;
    this.allUserData = '';
    this.userId = '';
  }

  getUserInfo() {
    const userInfo = {
      name: this.name.textContent,
      job: this.job.textContent
    }
    return userInfo;
  }

  setUserInfo(userData) {
    this.name.textContent = userData.name;
    this.job.textContent = userData.about;
    this.avatar.style.backgroundImage = `url(${userData.avatar})`
  }

  getAllUserData(userData) {
    this.allUserData = userData
  }

  setUserId(userData) {
    this.userId = userData._id
  }

  getUserId() {
    return this.userId;
  }

  isUser(id) {
    return Boolean(id === this.allUserData._id)
  }
}
