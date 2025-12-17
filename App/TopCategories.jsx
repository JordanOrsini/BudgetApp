import {useContext, useEffect, useState} from "react";
import {Pressable, Text, View} from "react-native";
import {getIconFromPath} from "./CategoryIconManager";
import {FlatList} from "react-native-gesture-handler";
import {styles} from "./Style";

import ListEmpty from "./ListEmpty";
import CategoriesContext from "./CategoriesContext";
import BottomSheetContext from "./BottomSheetContext";
import TransactionsContext from "./TransactionsContext";

const TopCategories = ({style}) => {
  const categoriesContext = useContext(CategoriesContext);
  const bottomSheetContext = useContext(BottomSheetContext);
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
      
      if (currentCategory.amount > topCategories[0].amount) {
        topCategories[2] = topCategories[1];
        topCategories[1] = topCategories[0];
        topCategories[0] = currentCategory;
      }
      else if (currentCategory.amount > topCategories[1].amount) {
        topCategories[2] = topCategories[1];
        topCategories[1] = currentCategory;
      }
      else if (currentCategory.amount > topCategories[2].amount) {
        topCategories[2] = currentCategory;
      }
    });

    fillData(topCategories);
  }

  const editItemHandler = (item) => {
    bottomSheetContext._setContent("Category", categoriesContext.findCategoryByName(item.name));
  }

  const fillData = (topCategories) => {
    const newDataArray = [];
    topCategories.map((element, index) => {
      if (element.categoryObject !== null) {
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
      <Pressable onPress={() => editItemHandler(item)}
                 disabled={item.name === "NONE"}>
        {({pressed}) => (
        <View style={styles.horizontalContainer}>
          <Text numberOfLines={1} style={[styles.listElementStart, pressed && styles.pressed]}>{item.name}</Text>
          <Text numberOfLines={1} style={[styles.listElement, pressed && styles.pressed]}>{myNumberFormatter.format(item.amount)}</Text>    
          <View style={[styles.topCategoryListElementEndIcon, pressed && styles.pressed]}>
            {getIconFromPath(item.categoryIcon)}
          </View>
        </View>
        )}
      </Pressable>
    );
  }

  return (
    <View style={[(data.length === 0) ? styles.mainBodyContainerSmall : styles.mainBodyContainer, style]}>
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