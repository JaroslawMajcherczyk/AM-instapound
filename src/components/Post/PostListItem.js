import React, {useState} from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import {Divider} from 'react-native-elements'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {postFooterIcons} from '../Data/postFooterIcons'
import {Entypo, FontAwesome, FontAwesome5} from "@expo/vector-icons";
import {Icon, IconButton} from "native-base";
import Toast from "react-native-root-toast";
import DoubleClick from "react-native-double-tap";
import ApiCalls from "../../utils/ApiCalls";

const PostListItem = ({post}) => {
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
            <Divider width={1} orientation='vertical'/>
            <PostHeader uploadedBy={uploaded_by}/>
            <PostImage imageUrl={picture} isLiked={isLiked} likePicture={likePicture}/>
            <View style={{marginHorizontal: 5}}>
                <PostFooter isLiked={isLiked} likePicture={likePicture} unlikePicture={unlikePicture}/>
                <View style={{marginHorizontal: 5}}>
                    <Likes likeCount={likeCount}/>
                    <Caption username={uploaded_by.username} description={description}/>
                    <CommentsSection commentCount={comment_count}/>
                </View>
            </View>

        </View>
    )
}

const PostHeader = ({uploadedBy}) => (
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
                    Toast.show('Additional actions can be here in future releases', {
                        duration: Toast.durations.SHORT,
                        position: Toast.positions.CENTER,
                    });
                }}
            />
        </View>
    </View>
)

const PostImage = ({imageUrl, isLiked, likePicture}) => {

    const image = (
        <View style={{width: '100%', aspectRatio: 5/4}}>
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

const PostFooter = ({isLiked, likePicture, unlikePicture}) => {

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
                    onPress={() => console.log('NAVIGATE TO POST COMMENTS')}
                />
            </View>
        </View>
    );
}

const Likes = ({likeCount}) => (
    <View style={{flexDirection: 'row'}}>
        <Text style={{fontWeight: '600'}}>{likeCount.toLocaleString('en')} Likes</Text>
    </View>
)

const Caption = ({username, description}) => (
    <View style={{marginTop: 5}}>
        <Text>
            <Text style={{fontWeight: '700'}}>{username}  </Text>
            <Text>{description.toLocaleString('en')}</Text>
        </Text>
    </View>
)

const CommentsSection = ({commentCount}) => (
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

export default PostListItem;
