import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, ScrollView, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import isEmpty from 'lodash/isEmpty';
import take from 'lodash/take';

import DefaultProfile from '~/assets/images/default_profile.png';
import ChatIcon from '~/assets/images/icons/chat.png';
import RightArrowIcon from '~/assets/images/icons/right_arrow.png';

import H1 from '~/components/headings/H1';
import H2 from '~/components/headings/H2';
import Touchable from '~/components/clickable/Touchable';
import useAppSettings from '~/models/AppSettings';
import useDashboardStore from '~/models/DashboardStore';
import {ROUTES} from '~/routes/types';
import {getBanners, getEvents, getPhotos, getPosts} from '~/services/dashboardService';
import styles from './styles';
import {getAddressString} from '~/utils';
import {DEVICE} from '~/utils/DeviceUtils';
import {navigate} from '~/utils/NavigationService';

import type {Photo} from '~/services/dashboardService';

export default function HomePage() {
    const theme = useAppSettings(state => state.theme);
    const events = useDashboardStore(state => state.events);
    const postsCount = useDashboardStore(state => state.posts.length);

    const [banners, setBanners] = useState<Photo[]>([]);
    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        loadDashboardData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const loadDashboardData = async () => {
        await getBannerImages();
        await getEvents();
        await getPhotosList();
        await getPosts();
    };

    const getBannerImages = async () => {
        const response = await getBanners();
        if (response && !isEmpty(response)) {
            setBanners(response);
        }
    };

    const getPhotosList = async () => {
        const response = await getPhotos();
        if (response && !isEmpty(response)) {
            setPhotos(response);
        }
    };

    const FlatLstItemSeparator = useCallback(() => <View style={styles(theme).orgSeparator} />, [theme]);

    return (
        <ScrollView contentContainerStyle={styles().pageContainer}>
            {!isEmpty(banners) ? (
                <Carousel
                    loop
                    width={DEVICE.WIDTH}
                    height={DEVICE.WIDTH / 2}
                    autoPlay={true}
                    data={banners}
                    scrollAnimationDuration={2500}
                    pagingEnabled={true}
                    renderItem={({item, index}) => (
                        <View style={styles().bannerContainer}>
                            <Image source={{uri: item.url}} style={styles().bannerImage} />
                            <Text style={styles(theme).bannerCount}>{`${index + 1} / ${banners.length}`}</Text>
                        </View>
                    )}
                />
            ) : (
                <View style={styles().carouselLoadingWrapper}>
                    <ActivityIndicator style={styles(theme).loadingIndicator} />
                </View>
            )}

            <View style={styles(theme).eventSection}>
                {!isEmpty(events) ? (
                    <>
                        <View>
                            <H1 label={events[0].name} textStyle={styles().eventTitle} />
                            <H2 label={getAddressString(events[0].address)} textStyle={styles().eventDescription} />
                        </View>
                        <View>
                            <H1 label={'Organizers'} textStyle={styles().subtitle} />
                            <FlatList
                                data={take(events, 3)}
                                scrollEnabled={false}
                                ItemSeparatorComponent={FlatLstItemSeparator}
                                renderItem={({item}) => (
                                    <View style={styles().orgItemWrapper}>
                                        <Image source={DefaultProfile} style={styles().orgItemImage} />
                                        <View style={styles().orgItemTextWrapper}>
                                            <Text style={styles(theme).orgItemTitle}>{item.name}</Text>
                                            <Text style={styles(theme).orgItemSubtitle}>{item.email}</Text>
                                        </View>
                                        <Image source={ChatIcon} style={styles(theme).orgItemIcon} />
                                    </View>
                                )}
                            />
                        </View>
                    </>
                ) : (
                    <ActivityIndicator style={styles(theme).loadingIndicator} />
                )}
            </View>

            <View style={styles(theme).photoSection}>
                {!isEmpty(photos) ? (
                    <>
                        <View style={styles().photoTitleWrapper}>
                            <H1 label={'Photos'} textStyle={styles().subtitle} />
                            <Touchable style={styles().allPhotosWrapper}>
                                <Text style={styles(theme).allPhotosText}>All Photos</Text>
                                <Image style={styles(theme).allPhotosIcon} source={RightArrowIcon} />
                            </Touchable>
                        </View>

                        <FlatList
                            data={photos}
                            horizontal
                            contentContainerStyle={styles().photoItemContainer}
                            renderItem={({item}) => (
                                <View style={styles().photoItemWrapper}>
                                    <Image source={{uri: item.thumbnailUrl}} style={styles().photosItemImage} />
                                    <View style={styles().photoItemTextWrapper}>
                                        <Text style={styles(theme).photoItemTitle} numberOfLines={1} ellipsizeMode={'tail'}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles(theme).photoItemSubtitle} numberOfLines={4} ellipsizeMode={'tail'}>
                                            {item.title}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        />
                    </>
                ) : (
                    <ActivityIndicator style={styles(theme).loadingIndicator} />
                )}
            </View>

            <Touchable style={styles(theme).postsSection} disabled={postsCount === 0} onPress={() => navigate(ROUTES.POSTS)}>
                {postsCount !== 0 ? (
                    <>
                        <Text style={styles(theme).postCountText}>{postsCount}</Text>
                        <Text style={styles(theme).postsText}>Posts</Text>
                    </>
                ) : (
                    <ActivityIndicator style={styles(theme).loadingIndicator} />
                )}
            </Touchable>
        </ScrollView>
    );
}
