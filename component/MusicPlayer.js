import React, { useEffect, useState, useRef, createRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, FlatList, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import Activity from '../ExpandableDrawer';

import songs from '../data';
const { width, height } = Dimensions.get('window');

const formatTime = secs => {
    let minutes = Math.floor(secs / 60);
    let seconds = Math.ceil(secs - minutes * 60);

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
};

export default function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHeartRed, setIsHeartRed] = useState(false);
    const [isSound, setIsSound] = useState(false);

    const test = createRef()

    const [duration, setDuration] = useState(0);
    const [timerId, setTimerId] = useState(0);
    const maximumValue = 300;

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    }
    const toggleHeart = () => {
        setIsHeartRed(!isHeartRed);
    }
    const toggleSound = () => {
        setIsSound(!isSound);
    }

    useEffect(() => {
        if (isPlaying) {
            const id = setInterval(() => {
                setDuration((duration) => duration + 1)
            }, 1000)
            setTimerId(id);
        }
        else if (timerId) {
            clearInterval(timerId)
        }
    }, [isPlaying])
    
    const [songIndex, setSongIndex] = useState(0);
    const [songOffSet, setSongOffSet] = useState(0);

    const scrollX = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        scrollX.addListener(({ value }) => {
            const index = Math.round(value / width);
            setSongIndex(index);
        });
    }, []);

    const renderSongs = ({ index, item }) => {
        return (

            <View style={{ width: width, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.imageWrapper}>
                    <Image source={item.image} style={styles.image} />
                </View>
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.artist}>{item.artist}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
           
            <View style={styles.maincontainer}>

                <FlatList
                    data={songs}
                    renderItem={renderSongs}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    extraData={"2"}
                    ref={test}
                    onScroll={(e) => {
                        const scrollOffSet = e.nativeEvent.contentOffset.x;
                        setSongOffSet(scrollOffSet);
                    }}
                />

                <View>
                    <Slider
                        style={styles.songProgress}
                        maximumValue={maximumValue}
                        thumbTintColor="#FFD369"
                        minimumTrackTintColor="#FFD369"
                        maximumTrackTintColor="#FFF"
                        onSlidingComplete={() => { }}
                        value={duration}
                        onValueChange={(value) => setDuration(value)}
                    />
                </View>

                <View style={styles.progressLabelContainer}>
                    <Text style={styles.progressLabelText}>{formatTime(duration)}</Text>
                    <Text style={styles.progressLabelText}>-{formatTime(maximumValue - duration)}</Text>
                </View>


                <View style={styles.musicControls}>
                    <TouchableOpacity onPress={() => { test.current.scrollToOffset({ offset: songOffSet - width, animated: true }) }}>
                        <Ionicons name="play-skip-back-outline" size={30} color='#FFD369' style={{ marginTop: 25 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { togglePlay() }}>
                        <Ionicons name={isPlaying ? "ios-pause-circle" : "ios-play-circle"} size={75} color='#FFD369' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { test.current.scrollToOffset({ offset: width + songOffSet, animated: true }) }}>
                        <Ionicons name="play-skip-forward-outline" size={30} color='#FFD369' style={{ marginTop: 25 }} />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.bottomConatiner}>
                <View style={styles.bottonControls}>

                    <TouchableOpacity onPress={() => { toggleHeart() }}>
                        <Ionicons name={isHeartRed ? "heart" : "heart-outline"} size={30} color='#777777' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                        <Ionicons name="repeat" size={30} color='#777777' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }}>
                        <Ionicons name="share-outline" size={30} color='#777777' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { toggleSound() }}>
                        <Ionicons name={isSound ? "volume-mute-outline" : "volume-high-outline"} size={30} color='#777777' />
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222831'
    },
    maincontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageWrapper: {
        width: 300,
        height: 340,
        marginBottom: 25,
        shadowColor: '#ccc',
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        color: '#EEEEEE'
    },
    artist: {
        fontSize: 16,
        fontWeight: '200',
        textAlign: 'center',
        color: '#EEEEEE'
    },
    songProgress: {
        width: 350,
        height: 40,
        marginTop: 25,
        flexDirection: 'row'
    },
    progressLabelContainer: {
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progressLabelText: {
        color: '#FFF'
    },
    musicControls: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingVertical: 20
    },
    bottomConatiner: {
        borderTopColor: '#393E46',
        borderTopWidth: 1,
        width: width,
        alignItems: 'center',
        paddingVertical: 20
    },
    bottonControls: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    }
});
