import React, {useEffect, useState} from 'react'
import ApiCalls from "../utils/ApiCalls";
import PostDetail from "../components/Post/PostDetail";
import UserAuthorization from "../utils/UserAuthorization";


const PostDetailScreen = ({route}) => {
    const {postId} = route.params;
    const [post, setPost] = useState(null)
    const [userIsOwner, setUserIsOwner] = useState(false)

    useEffect(async () => {
        const result = await ApiCalls.getPicture(postId);
        setPost(result);
        setUserIsOwner(result['created_by'] === await UserAuthorization.getUserId())
    }, [postId])

    return (
        <PostDetail post={post} userIsOwner={userIsOwner}>
        </PostDetail>
    )
}

export default PostDetailScreen
