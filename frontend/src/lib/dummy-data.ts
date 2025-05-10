import { Person, Post } from "./interfaces";

/* Dummy data for testing */

const dummyPeople: Person[] = [
    {
        name: "gorklon rust",
        username: "@elonmusk",
        img: "https://pbs.twimg.com/profile_images/1919097976594837506/5JJEissI_400x400.jpg",
    },
    {
        name: "Donald J. Trump",
        username: "@realDonaldTrump",
        img: "https://pbs.twimg.com/profile_images/874276197357596672/kUuht00m_400x400.jpg",
    },
];
const dummyPosts: Post[] = [
    {
        text: "This was so wonderful, 9 years ago today!",
        time: "2025-05-05T15:54:40.000Z",
        comments: 15790,
        retweets: 33815,
        likes: 371853,
        views: 66043801,
    },
    {
        text: "Democratic Rep. Jasmine Crockett accused of ‘abusing her power’ at airport after she cut passengers in wheelchairs https://trib.al/Dscc1R8",
        time: "2025-05-06T18:27:37.000Z",
        comments: 2276,
        retweets: 3377,
        likes: 13231,
        views: 2477015,
    },
];

export { dummyPeople, dummyPosts };
