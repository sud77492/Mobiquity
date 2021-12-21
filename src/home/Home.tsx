import React, {useState, useEffect} from 'react';
import {StyleSheet, StatusBar, SafeAreaView, Text, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import List from './List';
import Search from './Search';

const Home = ({navigation}) => {
    const [data, setData] = useState<Data>();
    const [error, setError] = useState<Error>();
    const [keyword, setKeyword] = useState<string>();
    const [indicator, setIndicator] = useState<boolean>();

    const requests = new Set();
    const fetchData = async (
    query: string = 'panda',
    pageIndex: number = 1,
    perPage: number = 20,
    ) => {
        
        //pageIndex == 0 ? setIndicator(true) : setIndicator(false);
        
       const url = `https://api.pexels.com/v1/search?query=${query}&page=${pageIndex}&per_page=${perPage}`;
       console.log(url);

        try {
            if (requests.has(url)) {
                return;
            }
            requests.add(url);
            console.log(`fetch from: ${url}`);

            const response = await fetch(url, {
            headers: {
                Authorization:
                '563492ad6f91700001000001b9f2b3829f4d4091bee19fb910267cc1',
            },
            });
            const json = await response.json();
            console.log(json.photos);
            const photos =
                data && data.photos ? data?.photos.concat(json.photos) : json.photos;
            console.log(photos);
            setData({...json, photos});
            console.log(data?.photos);
            //setIndicator(false);
        }catch (error) {
            setError(error);
            //setIndicator(false);
        } finally {
            requests.delete(url);
            //setIndicator(false);
        }
    };

    const nextPage = () => {
        const key = 'page';
        if (data?.next_page) {
          const page = decodeURIComponent(
            data.next_page.replace(
              new RegExp(
                '^(?:.*[&\\?]' +
                  encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
                  '(?:\\=([^&]*))?)?.*$',
                'i',
              ),
              '$1',
            ),
          );
          console.log(page);
          fetchData(keyword, parseInt(page, 10) || 0, 20);
        }
      };
    
      const onSearch = (query: string) => {
        setKeyword(query);
        setData(undefined);
      };

    const icon = error ? (
        <Icon name={'cloud-off'} style={styles.icon} size={160} color={'grey'} />
     ) : undefined;

     const list =
        data && !!data.photos && data.photos.length > 0 ? (
            <List data={data.photos} nextPage={nextPage} navigation={navigation}  />
        ) : <Text style={styles.icon}>Please search image on the search bar</Text>;

    useEffect(() => {
        console.log(indicator)
        if (keyword) {
            (async () => await fetchData(keyword, 0, 20))();
          }
        }, [keyword]);

        const search = <Search onSearch={onSearch} />;

        const activityIndicator= indicator ? (
            <ActivityIndicator style={styles.indicator} size="large"/> ) : undefined
    
    return (
        <SafeAreaView style={styles.container}>
            {search}
            {list}
            {icon}
        </SafeAreaView>
      );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0 + 0,
    marginHorizontal: 0,
  },
  icon: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    top: '40%',
  },
  indicator: {
      flex:1,
      justifyContent: 'center'
  }
});
export default Home;