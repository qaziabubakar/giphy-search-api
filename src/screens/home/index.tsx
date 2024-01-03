import { View, StyleSheet, FlatList, Image, TextInput, Text } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Home: React.FC = () => {

    const { usedTheme, usedColors, usedFonts, usedFontFamily } = useSelector((state: RootState) => state.theme);
    const [data, setData] = React.useState<any[]>([]);

    const getGifs = async (search: string) => {

        const Url = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=YIgFoVU5Y8vghmhTR4LmyhZffICVJHA7&limit=10`

        var requestOptions = {
            method: 'GET',
        };

        fetch(Url, requestOptions)
            .then(response => response.text())
            .then(result => {
                const data = JSON.parse(result)?.data
                setData(data)
                console.log(data[0]);

            })
            .catch(error => console.log('error', error));
    }

    const handleDebounce = (text: string) => {

        if (text.length > 1) {
            const sub = setTimeout(() => {
                getGifs(text)
            }, 1000);

            return () => clearTimeout(sub)

        } else {
            setData([])
        }
    }


    const renderItem = ({ item }: any) => {
        return (
            <View style={styles.imgViewStyle}>
                <Image source={{ uri: item?.images?.original?.url }} style={styles.imgStyle} />
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: usedColors?.background, flex: 1 }}>


            <TextInput
                style={{ height: 50, borderColor: 'gray', borderWidth: 1, width: '90%', borderRadius: 10, padding: 10, alignSelf: 'center', color: usedColors?.text, marginTop: 20 }}
                onChangeText={handleDebounce}
                placeholder={'Search'}
                placeholderTextColor={'grey'}
            />

            {
                data.length > 0 ?
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        numColumns={2}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        keyExtractor={item => item.id}
                    />
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ color: usedColors?.text }}>No data</Text>
                    </View>
            }

        </View >
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        padding: 10,
        backgroundColor: 'lightgrey',
    },
    imgViewStyle: {
        margin: 10,
        borderRadius: 20,
    },
    imgStyle: {
        width: 150,
        height: 150,
        borderRadius: 20,
    }
});

export default Home