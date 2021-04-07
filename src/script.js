var avatar;

function pickAnAvatar(pickedAvatar) {
  avatar = pickedAvatar + ".svg";
  console.log(avatar);
  sessionStorage.setItem("avatar", avatar);
}

function getAvatar() {
  var pickedAvatar = sessionStorage.getItem("avatar");
  return "img/avatars/" + pickedAvatar;
}
