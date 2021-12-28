import React, {useState} from "react";
import ApiCalls from "../../utils/ApiCalls";
import {Text, View} from "react-native";
import {Divider} from "react-native-elements";
import {Caption, CommentsSection, Likes, PostFooter, PostHeader, PostImage} from "./PostComponents";

const PostDetail = ({post, userIsOwner}) => {
    if (!post) return <View></View>

    const {id, picture, description, like_count, comment_count, is_liked, uploaded_by} = post;

    // state needed for likes
    const [isLiked, setIsLiked] = useState(is_liked);
    const [likeCount, setLikeCount] = useState(like_count);

    const likePicture = () => {
        if (isLiked) return;

        //api request here
        ApiCalls.likePicture(id).then(success => {
            if (!success) return;
            setIsLiked(true);
            setLikeCount(likeCount + 1);
        });
    }

    const unlikePicture = () => {
        if (!isLiked) return;

        // api request here
        ApiCalls.unlikePicture(id).then(success => {
            if (!success) return;
            setIsLiked(false);
            setLikeCount(likeCount - 1);
        });
    }

    return (
        <View style={{marginBottom: 15}}>
            <PostHeader uploadedBy={uploaded_by}/>
            <PostImage imageUrl={picture} isLiked={isLiked} likePicture={likePicture}/>
            <View style={{marginHorizontal: 5, marginBottom:10}}>
                <PostFooter isLiked={isLiked} likePicture={likePicture} unlikePicture={unlikePicture} postId={id}/>
                <View style={{marginHorizontal: 5}}>
                    <Likes likeCount={likeCount}/>
                    <Caption username={uploaded_by.username} description={description}/>
                </View>
            </View>
            <Divider width={0.5} orientation='horizontal'/>
        </View>
    )
}

export default PostDetail;