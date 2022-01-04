import React, {useState} from "react";
import ApiCalls from "../../utils/ApiCalls";
import {ScrollView, Text, View} from "react-native";
import {Divider} from "react-native-elements";
import {Caption, CommentList, Likes, PostFooter, PostHeader, PostImage} from "./PostComponents";
import {Button, Modal, TextArea} from "native-base";

const PostDetail = ({post, userIsOwner, triggerRefresh}) => {
    if (!post) return <View></View>

    const {id, picture, description, like_count, picture_comments, is_liked, uploaded_by} = post;

    // state for modal
    const [modalIsEdit, setModalIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [commentId, setCommentId] = useState('');
    const [commentContent, setCommentContent] = useState('');

    const openEditModal = (commId, commContent) => {
        setModalIsEdit(true);
        setCommentId(commId);
        setCommentContent(commContent);
        setShowModal(true);
    };

    const openCreateModal = () => {
        setModalIsEdit(false);
        setShowModal(true);
    };

    const submitModal = async () => {
        const status = modalIsEdit ? await ApiCalls.editComment(commentId, commentContent.trim()) : await ApiCalls.createComment(id, commentContent.trim());
        if (status === 'success') {
            setShowModal(false);
            triggerRefresh()
        }
    }

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
        <ScrollView>
            <PostHeader uploadedBy={uploaded_by} userIsOwner={userIsOwner} postId={id} showDetails={false}/>
            <PostImage imageUrl={picture} isLiked={isLiked} likePicture={likePicture}/>
            <View style={{marginHorizontal: 5, marginBottom:10}}>
                <PostFooter isLiked={isLiked} likePicture={likePicture} unlikePicture={unlikePicture} postId={id} openCreateModal={openCreateModal}/>
                <View style={{marginHorizontal: 5}}>
                    <Likes likeCount={likeCount}/>
                    <Caption username={uploaded_by.username} description={description}/>
                </View>
            </View>
            <Divider width={1} orientation='horizontal'/>
            <CommentList comments={picture_comments} openEditModal={openEditModal}/>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content width={"350"} height={"350"}>
                    <Modal.CloseButton/>
                    <Modal.Header>{modalIsEdit ? 'Edit Comment' : 'Create Comment'}</Modal.Header>
                    <Modal.Body>
                        <View>
                            <TextArea
                                onChangeText={text => setCommentContent(text)}
                                h={"240"}
                                value={modalIsEdit ? commentContent : null}
                                placeholder={"Write a comment here!"}
                                w={"100%"}
                            />
                            <Button onPress={submitModal} style={{marginTop: 5}}>Save</Button>
                        </View>
                    </Modal.Body>
                </Modal.Content>
            </Modal>

        </ScrollView>
    )
}

export default PostDetail; 