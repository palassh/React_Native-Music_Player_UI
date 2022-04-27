// import React, {Component} from 'react';
// import {Text, View, FlatList, ActivityIndicator} from 'react-native';
// import { SearchBar } from 'react-native-elements';

// export default class Details extends Component {

//     constructor(props) {
//         super(props);
    
//         this.state = {
//           data: [],
//           isLoading: true,
//           search: '',
//           SearchedFullData:[],
//           fullData: [],
//         };
//       }
    
//     componentDidMount() {
//       fetch('https://blooming-lake-03275.herokuapp.com/https://lrganalytics.sofmen.com/api/session')
//         .then((response) => response.json())
//         .then((json) => {
//           this.setState({ fullData: json.data,SearchedFullData:json.data});
//         })
//         .catch((error) => console.error(error))
//         .finally(() => {
//           this.setState({ isLoading: false });
//         });
//     }
    
//     handleSearch = (text) => {
//         var filteredArray = this.state.fullData.filter(function (item) {
//           return item['sym'].includes(text)
//       });
//       this.setState({ search: text, SearchedFullData:filteredArray});
//     };

//     render() {
//       const { isLoading } = this.state;
  
//       return (
//         <View style={{ flex: 1, padding: 24}}>
//           <SearchBar 
//               placeholder="Type Here..."
//               onChangeText={this.handleSearch}
//               value={this.state.search}/>
//           {isLoading ? <ActivityIndicator/> : (
//             <View >
//             <FlatList
//               data={this.state.SearchedFullData}
//               KeyExtractor={(item) => item.sym}
//               renderItem={({ item }) => (
//                 <Text style={{borderColor:'#232F34',borderWidth:1}}>{item.data.rows}, {item.stk_name}, {item.gundersonGrade}, {item.lastClosingPrice}, {item.marketSize},
//                 {item.marketCap},{item.momentom},{item.momentom.Grd},{item.ranking},{item.sector},{item.riskProfile}                
//                 </Text>
//               )}
//             />
//             </View>
//           )}
//         </View>
//       );
//     }
//   };