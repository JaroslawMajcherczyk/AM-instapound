import {Image, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {Button, Icon, IconButton, Modal} from "native-base";
import {Entypo, FontAwesome, FontAwesome5} from "@expo/vector-icons";
import DoubleClick from "react-native-double-tap";
import {useNavigation} from "@react-navigation/native";
import ApiCalls from "../../utils/ApiCalls";

export const PostHeader = ({uploadedBy, userIsOwner, postId, triggerRefresh=null, showDetails=true}) => {
    const nav = useNavigation();
    const [showModal, setShowModal] = useState(false);

    const deletePicture = async () => {
        await ApiCalls.deletePicture(postId);
        if (!showDetails) { // this means we are on details screen
            nav.goBack(); // so we navigate after delete
        }
        if (triggerRefresh)
            triggerRefresh(); // trigger refresh if it was passed
    }

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 8
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <Image source={{uri: uploadedBy.picture}} style={styles.story}/>
                <Text
                    style={{
                        marginLeft: 5,
                        fontWeight: '700',
                    }}>
                    {uploadedBy.username}
                </Text>
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginRight: 10
            }}>
                <IconButton
                    icon={<Icon as={Entypo} size={14} name="dots-three-horizontal"/>}
                    _pressed={{
                        bgColor: 'gray.100'
                    }}
                    onPress={() => {
                        setShowModal(true);
                    }}
                />
            </View>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton/>
                    <Modal.Header>More</Modal.Header>
                    <Modal.Body>
                        <Button.Group direction={"column"} size="lg">
                            {
                                showDetails
                                    ? <Button onPress={() => nav.navigate('Home', {screen: 'Post Detail', params: {postId: postId}})}>Show Details</Button>
                                    : <></>
                            }
                            {
                                userIsOwner
                                    ? <Button onPress={deletePicture} style={{backgroundColor: 'red'}}>Delete</Button>
                                    : <></>
                            }
                        </Button.Group>
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </View>
    );
}
export const PostImage = ({imageUrl, isLiked, likePicture}) => {

    const image = (
        <View style={{width: '100%', aspectRatio: 5 / 4}}>
            <Image source={{uri: imageUrl}} style={{height: '100%', resizeMode: 'stretch'}}/>
        </View>);

    return isLiked ? image : <DoubleClick doubleTap={likePicture} delay={200}>{image}</DoubleClick>;
}
const LikePictureIcon = ({likePicture}) => (
    <IconButton
        size="sm"
        icon={<Icon as={FontAwesome5} size={30} name="heart" color="black"/>}
        _pressed={{bg: null}}
        onPress={likePicture}
    />
)
const UnlikePictureIcon = ({unlikePicture}) => (
    <IconButton
        size="sm"
        icon={<Icon as={FontAwesome} size={30} name="heart" color="crimson"/>}
        _pressed={{bg: null}}
        onPress={unlikePicture}
    />
)
export const PostFooter = ({isLiked, likePicture, unlikePicture, postId}) => {
    const nav = useNavigation();
    return (
        <View style={{flexDirection: 'row'}}>
            <View style={styles.leftFooterIconsContainer}>
                {
                    isLiked
                        ? <UnlikePictureIcon unlikePicture={unlikePicture}/>
                        : <LikePictureIcon likePicture={likePicture}/>
                }
                <IconButton
                    size="sm"
                    icon={<Icon as={FontAwesome5} size={30} name="comment" color="black"/>}
                    _pressed={{bg: null}}
                    onPress={() => nav.navigate('Home', {screen: 'Post Detail', params: {postId: postId}})}
                />
            </View>
        </View>
    );
}
export const Likes = ({likeCount}) => (
    <View style={{flexDirection: 'row'}}>
        <Text style={{fontWeight: '600'}}>{likeCount.toLocaleString('en')} Likes</Text>
    </View>
)
export const Caption = ({username, description}) => (
    <View style={{marginTop: 5}}>
        <Text>
            <Text style={{fontWeight: '700'}}>{username}  </Text>
            <Text>{description.toLocaleString('en')}</Text>
        </Text>
    </View>
)
export const CommentsSection = ({commentCount}) => (
    <View style={{marginTop: 5}}>
        {commentCount ? (<Text>View {commentCount} {commentCount > 1 ? 'comments' : 'comment'}</Text>) : null}
    </View>
)
const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 8,
        borderWidth: 1.5,
        borderColor: '#444',
    },
    footerIcon: {
        width: 30,
        height: 30,
    },
    leftFooterIconsContainer: {
        flexDirection: 'row',
        width: '19%',
        justifyContent: 'space-between'
    },
})