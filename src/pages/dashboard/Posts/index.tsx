import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import map from 'lodash/map';

import RightArrowIcon from '~/assets/images/icons/left_arrow.png';

import Touchable from '~/components/clickable/Touchable';
import H1 from '~/components/headings/H1';
import PageContainer from '~/components/PageContainer';
import useAppSettings from '~/models/AppSettings';
import useDashboardStore from '~/models/DashboardStore';
import {getComments, type Comment} from '~/services/dashboardService';
import styles from './styles';
import {navigationGoBack} from '~/utils/NavigationService';

export default function PostsPage() {
    const theme = useAppSettings(state => state.theme);
    const posts = useDashboardStore(state => state.posts);

    const [selectedPost, setSelectedPost] = useState<number | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        if (!isNull(selectedPost)) {
            getComments(selectedPost).then(response => {
                if (!isEmpty(response)) {
                    setComments(response);
                }
            });
        }
    }, [selectedPost]);

    const FlatLstItemSeparator = useCallback(() => <View style={styles(theme).postSeparator} />, [theme]);

    const CommentItem = useCallback(
        ({id, body, name}: Comment) => (
            <View style={styles(theme).commentWrapper} key={id}>
                <Text style={styles(theme).commentAuthorText} numberOfLines={1}>
                    {name}
                </Text>
                <Text style={styles(theme).commentBodyText}>{body}</Text>
            </View>
        ),
        [theme],
    );

    const readMorePosts = (postId: number) => {
        setComments([]);
        setSelectedPost((prev: number | null) => (prev === postId ? null : postId));
    };

    return (
        <PageContainer scrollDisabled removePadding>
            <View style={styles(theme).headerContainer}>
                <View style={styles().headerDefault}>
                    <Touchable style={styles().undoIconContainer} onPress={() => navigationGoBack()}>
                        <Image source={RightArrowIcon} style={styles(theme).undoIcon} />
                    </Touchable>
                </View>
                <View style={styles().headerDefault}>
                    <H1 label={'Posts'} textStyle={styles().headerTitle} />
                </View>
                <View style={styles().headerDefault} />
            </View>

            <FlatList
                data={posts}
                ItemSeparatorComponent={FlatLstItemSeparator}
                renderItem={({item}) => (
                    <View style={styles(theme, item.id === selectedPost).postWrapper}>
                        <Text style={styles(theme).postTitle} ellipsizeMode={'tail'} numberOfLines={item.id !== selectedPost ? 2 : undefined}>
                            {item.title}
                        </Text>
                        <Text style={styles(theme).postSubtitle} ellipsizeMode={'tail'} numberOfLines={item.id !== selectedPost ? 4 : undefined}>
                            {item.body}
                        </Text>
                        <Touchable onPress={() => readMorePosts(item.id)}>
                            <Text style={styles(theme).postReadMore}>{item.id !== selectedPost ? 'Read More ▶︎' : 'Read Less ▼'}</Text>
                        </Touchable>

                        {item.id === selectedPost && (
                            <View style={styles().commentSection}>{!isEmpty(comments) ? <>{map(comments, CommentItem)}</> : <ActivityIndicator />}</View>
                        )}
                    </View>
                )}
            />
        </PageContainer>
    );
}
