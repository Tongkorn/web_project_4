export default class UserInfo {
  constructor(profileTitleElement, profileSubtitleElement, profileAvatarElement) {
    this.name = profileTitleElement;
    this.job = profileSubtitleElement;
    this.avatar = profileAvatarElement;
    this.userId = '';
  }

  setUserInfo(userData) {
    this.name.textContent = userData.name;
    this.job.textContent = userData.about;
  }

  setAvatar(userData) {
    this.avatar.style.backgroundImage = `url(${userData.avatar})`
  }

  setUserId(userData) {
    this.userId = userData._id
  }

  getUserId() {
    return this.userId;
  }
}
