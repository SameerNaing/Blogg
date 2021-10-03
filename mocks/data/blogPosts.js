const blogImgs = [
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  "https://im0-tub-ru.yandex.net/i?id=e67c20f98bdc512c5d3bc20c140f8fac&n=27&h=480&w=480",
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
  "https://images.unsplash.com/photo-1462486387766-dcf408d34ece?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=327&q=80",
  "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  "https://images.unsplash.com/photo-1593642532781-03e79bf5bec2?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=688&q=80",
];

const userImg =
  "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

const blogPosts = [...Array(25).keys()].map((i) => {
  return {
    id: `${i}`,
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    image: blogImgs[Math.floor(Math.random() * 6)],
    userImg,
    userName: "Sit Amet",
    date: "2, Sep, 2021",
    userID: `${Math.floor(Math.random() * 6)}`,
  };
});

export default blogPosts;
