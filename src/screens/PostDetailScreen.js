import React, {useEffect, useState} from 'react'
import ApiCalls from "../utils/ApiCalls";
import PostDetail from "../components/Post/PostDetail";
import UserAuthorization from "../utils/UserAuthorization";


const PostDetailScreen = ({route}) => {
    const {postId} = route.params;
    const [post, setPost] = useState(null)
    const [userIsOwner, setUserIsOwner] = useState(false)
    const [trig, setTrig] = useState(false)

    useEffect(async () => {
        const result = await ApiCalls.getPicture(postId);
        setPost(result);
        setUserIsOwner(result.uploaded_by.id === await UserAuthorization.getUserId())
    }, [postId, trig])

    return (
        <PostDetail post={post} userIsOwner={userIsOwner} triggerRefresh={() => setTrig(!trig)}>
        </PostDetail>
    )
}

export default PostDetailScreen
