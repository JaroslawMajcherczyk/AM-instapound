import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { postFooterIcons } from '../Data/postFooterIcons'

const Post = ({post}) => {
    return (
        <View style={{marginBottom: 30}}>
            <Divider width={1} orientation='vertical'/>
            <PostHeader post={post}/>
            <PostImage post={post}/>
            <View style={{marginHorizontal: 10, marginTop:10}}>
            <PostFooter/>
            <Likes post={post}/>
            <Caption post={post}/>
            <CommentsSection post={post}/>
            <Comments post={post} />
            </View>
        
        </View>
    )
}

const PostHeader = ({post}) =>(
    <View style={{flexDirection:'row',
    justifyContent:'space-between',
    margin: 5,
    alignItems: 'center',
    }}>
    <View style={{
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5,
     }}>
     <View style={{flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'
    }}>
    <Image source={{uri: post.profile_picture}}
    style={styles.story}
    />
    <Text
    style={{marginLeft: 5,
    fontWeight: '700',
    }}>
    {post.user}
    </Text>
    </View>

    <View>
    <Text style={{fontWeight:'900', alignItems: 'flex-end'}}>...</Text>
    </View>

    </View>
    </View>
)

const PostImage =({post}) =>(
    <View style={{
        width: '100%',
        height: 450,
    }}>
    <Image 
    source={{uri: post.imageUrl}} 
    style={{height: '100%', resizeMode: 'cover'}}
     /> 
     </View>
)

const PostFooter =() => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.leftFooterIconsContainer}>
        <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[0].imageUrl}/>
        <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[1].imageUrl}/>
        <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[2].imageUrl}/>
        </View>

        <View>
        <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcons[3].imageUrl}/>
        </View>
    </View>
)

const Likes = ({post}) => (
    <View style={{flexDirection:'row', marginTop:5}}>
<Text style={{fontWeight:'600'}}>
{post.likes.toLocaleString('en')} Likes</Text>
</View>
)

const Caption = ({post}) => (
<View style= {{marginTop: 5}}>
<Text>
    <Text style={{fontWeight:'700'}}>{post.user}  </Text>
    <Text>{post.caption.toLocaleString('en')}</Text>
</Text>
</View>
)

const CommentsSection = ({post}) => (
    <View style={{marginTop: 5}}>
    {!!post.comments.length &&(
        <Text>
        View {post.comments.length > 1 ? 'all ':''}{post.comments.length}{' '}
        {post.comments.length> 1 ? 'comments':'comment'}
        </Text>
        )}
        </View>
    )

const Comments =({post}) => (
<View>
    {post.comments.map((comment, index)=> (
        <View key={index} style={{flexDirection: 'row', marginTop: 5}}>
        
        <Text style={{fontWeight: '700'}}>{comment.user} </Text>
        <Text>{comment.comment}</Text>
        
        </View>
    ))}
</View>
)

const Icon=({imgStyle, imgUrl})=>
(
    <TouchableOpacity>
    <Image style={imgStyle} source={{uri: imgUrl}}/>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    story:{
        width: 35,
        height:35,
        borderRadius: 50,
        marginLeft: 8,
        borderWidth: 1.5,
        borderColor: '#444',
    },
    footerIcon:{
        width:30,
        height:30,
    },
    leftFooterIconsContainer: {
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'space-between'
    },
})

export default Post
