import {useContext, useEffect, useState} from "react";
import {Text, View} from "react-native";
import {getIconFromPath} from "./CategoryIconManager";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import ListEmpty from "./ListEmpty";
import CategoriesContext from "./CategoriesContext";
import TransactionsContext from "./TransactionsContext";

const TopCategories = () => {
  const categoriesContext = useContext(CategoriesContext);
  const transactionsContext = useContext(TransactionsContext);

  const [data, setData] = useState([]);
  const myNumberFormatter = new Intl.NumberFormat("en-CA", {style: "currency", currency: "CAD"});

  useEffect(() => {
    calcTopCategories();
  }, [transactionsContext.transactionData]);

  const calcTopCategories = () => {
    const topCategories = [{categoryObject: null, amount: 0},
                           {categoryObject: null, amount: 0},
                           {categoryObject: null, amount: 0}];

    categoriesContext.categoryData.map((category) => {
      let currentCategory = {categoryObject: category, amount: 0};

      transactionsContext.findTransactionsByCategory(category).map((transaction) => {
        currentCategory.amount = currentCategory.amount + transaction.getAmount();
      }); 
      
      if (topCategories[0].categoryObject === null || 
          currentCategory.amount > topCategories[0].amount) {
        topCategories[2] = topCategories[1];
        topCategories[1] = topCategories[0];
        topCategories[0] = currentCategory;
      }
      else if (topCategories[1].categoryObject === null || 
               currentCategory.amount > topCategories[1].amount) {
        topCategories[2] = topCategories[1];
        topCategories[1] = currentCategory;
      }
      else if (topCategories[2].categoryObject === null || 
               currentCategory.amount > topCategories[2].amount)
        topCategories[2] = currentCategory;
    });

    fillData(topCategories);
  }

  const fillData = (topCategories) => {
    const newDataArray = [];
    topCategories.map((element, index) => {
      if (element.categoryObject !== null && 
          element.amount !== 0) {
        newDataArray.push({index: index, 
                           name: element.categoryObject.getName(), 
                           amount: element.amount, 
                           categoryIcon: element.categoryObject.getIconPath(),
                          });
      }
    });

    setData(newDataArray);
  }

  const ListHeader = () => {
    return (
      <View style={styles.background}>
        <Text style={styles.containerHeaderText}>Top categories</Text>
        <View style={styles.horizontalContainer}>
          <Text numberOfLines={1} style={styles.listElementStart}>Name</Text>
          <Text numberOfLines={1} style={styles.listElement}>Amount</Text>    
          <Text numberOfLines={1} style={styles.topCategoryListElementEndText}>Category</Text>
        </View>
      </View>
    );
  }

  const renderItem = ({item}) => {
    return (
      <View style={styles.horizontalContainer}>
        <Text numberOfLines={1} style={styles.listElementStart}>{item.name}</Text>
        <Text numberOfLines={1} style={styles.listElement}>{myNumberFormatter.format(item.amount)}</Text>    
        <View style={styles.topCategoryListElementEndIcon}>
          {getIconFromPath(item.categoryIcon)}
        </View>
      </View>
    );
  }

  return (
    <View style={[data.length !== 0 ? styles.mainBodyContainer : styles.mainBodyContainerSmall]}>
      <FlatList data={data} 
                renderItem={(item) => renderItem(item)} 
                keyExtractor={(item) => item.index}
                ListEmptyComponent={ListEmpty}
                contentContainerStyle={styles.flatListContentContainer}
                ListHeaderComponent={ListHeader}
                stickyHeaderIndices={[0]}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false} /> 
    </View>      
    );
}

export default TopCategories;