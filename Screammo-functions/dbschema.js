let db = {
  users: [
    {
      userId: "a3435jhjh5rt8jhhf8wnnhbkb3f1rd",
      email: "user@email.com",
      handle: "user",
      createdAt: "2020-03-04T19:28:28.463Z",
      imageUrl: "image/adhkaghk",
      bio: "This is a bio",
      website: "https://user.com",
      location: "London, UK",
    },
  ],
  screams: [
    {
      userHandle: "user",
      body: "this is the scream body",
      createdAt: "2020-03-04T19:28:28.463Z",
      likeCount: 5,
      commentCount: 2,
    },
  ],
  comments: [
    {
      userHandle: "user",
      screamId: "4djfkkdjk5588sfnsd24fwe23",
      body: "nice one mate",
      commentCount: 3,
    },
  ],
};

const userDetails = {
  //Redux Data
  credentials: {
    userId: "IMQ1hhq3P1QbaLjSqRhx5LUSr4p2",
    email: "tanzim@email.com",
    handle: "tanzim",
    createdAt: "2020-04-16T04:54:40.767Z",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/screammo-148ea.appspot.com/o/595046600.jpg?alt=media",
    bio: "Hello, I am Tanzim",
    website: "http://google.com",
    location: "LA, USA",
  },
  likes: [
    {
      userHandle: "tanzim",
      screamId: "",
    },
    {
      userHandle: "tanzim",
      screamId: "",
    },
  ],
};
