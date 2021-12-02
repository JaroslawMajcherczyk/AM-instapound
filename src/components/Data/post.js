import { USERS } from "./users";

export const POSTS = [
{
    imageUrl: 'https://wl-brightside.cf.tsp.li/resize/728x/jpg/268/157/0dc7db53749bf212d3cf358e4d.jpg',
    user: USERS[0].user,
    likes: 819,
    caption: 'Lorem ipsum',
    profile_picture: USERS[0].image,
    comments:[
        {
            user: USERS[1].user,
            comment: ' Wow, Lorem ipsum',
        },
       
    ],
}, 
{
    imageUrl: 'https://cdn.pocket-lint.com/r/s/970x/assets/images/151442-cameras-feature-stunning-photos-from-the-national-sony-world-photography-awards-2020-image1-evuxphd3mr-jpg.webp?v1',
    user: USERS[1].user,
    likes: 819,
    caption: 'Lorem ipsum',
    profile_picture: USERS[1].image,
    comments:[
        {
            user: USERS[2].user,
            comment: ' Wow, Lorem ipsum',
        },
        {
            user: USERS[3].user,
            comment: ' Wow, Lorem ipsum',
        },
    ],
}, 
{
    imageUrl: 'https://i2.wp.com/www.alphr.com/wp-content/uploads/2018/04/how_to_back_up_photos_on_google_photos.jpg?zoom=2&resize=738%2C320&ssl=1',
    user: USERS[2].user,
    likes: 29,
    caption: 'Lorem ipsum',
    profile_picture: USERS[2].image,
    comments:[
        {
            user: USERS[3].user,
            comment: ' Wow, Lorem ipsum',
        },
        {
            user: USERS[0].user,
            comment: ' Wow, Lorem ipsum',
        },
    ],
}, 

{
imageUrl: 'https://wl-brightside.cf.tsp.li/resize/728x/jpg/33f/b8a/60863d5189af87971c3874fccd.jpg',
user: USERS[3].user,
likes: 341,
caption: 'Lorem ipsum',
profile_picture: USERS[3].image,
comments:[
    {
        user: USERS[1].user,
        comment: ' Wow, Lorem ipsum',
    },
    {
        user: USERS[0].user,
        comment: ' Wow, Lorem ipsum Tylko Bla bla',
    },
],
}, 
 
]

