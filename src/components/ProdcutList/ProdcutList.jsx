//@ts-nocheck
import React, { useCallback, useEffect } from "react";
import "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";

const products = [
  {
    id: 1,
    title: "Galaxy X10 Smartphone",
    price: 39990,
    description:
      "A powerful smartphone with a 6.5-inch display and triple camera system.",
  },
  {
    id: 2,
    title: "UltraBook Pro Laptop",
    price: 79990,
    description:
      "Lightweight and fast laptop, perfect for work and entertainment.",
  },
  {
    id: 3,
    title: "SoundMax Wireless Headphones",
    price: 8990,
    description: "High-quality sound with up to 30 hours of battery life.",
  },
  {
    id: 4,
    title: "FitWatch 3 Smartwatch",
    price: 12990,
    description: "Track your health and stay connected right from your wrist.",
  },
  {
    id: 5,
    title: '4K Ultra HD 55" TV',
    price: 49990,
    description: "Vibrant picture quality with support for all modern formats.",
  },
  {
    id: 6,
    title: "GameBox X Console",
    price: 45990,
    description: "Next-gen gaming with 4K graphics and VR support.",
  },
  {
    id: 7,
    title: "TabMaster 11 Tablet",
    price: 25990,
    description: "Versatile device for studying, working, and entertainment.",
  },
  {
    id: 8,
    title: '27" IPS Full HD Monitor',
    price: 17990,
    description: "Perfect for graphic work, productivity, and movie nights.",
  },
  {
    id: 9,
    title: "Mechanical Pro Keyboard",
    price: 5990,
    description: "RGB mechanical keyboard with ergonomic design.",
  },
  {
    id: 10,
    title: "SpeedClick X5 Gaming Mouse",
    price: 3490,
    description: "High-precision mouse with customizable buttons and lighting.",
  },
];

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => acc + item.price, 0);
};

const ProductList = () => {
  const [addedItems, setAddedItems] = React.useState([]);
  const { tg, queryId } = useTelegram();
  const onSendData = useCallback(() => {
    const productTitles = addedItems.map((item) => item.title);
    const data = {
      products: productTitles,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };
    fetch("https://test-of-tg-app-server.onrender.com/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }, [queryId, addedItems]);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);

    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData, tg]);

  const onAdd = (product) => {
    const aleradyAdded = addedItems.find((item) => item.id === product.id);
    let newItems = [];
    if (aleradyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }
    setAddedItems(newItems);
    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Buy: ${getTotalPrice(newItems)} UAH`,
      });
    }
  };

  return (
    <div className={"list"}>
      {products.map((item) => {
        return (
          <ProductItem
            product={item}
            onAdd={() => onAdd(item)}
            className={"item"}
          />
        );
      })}
    </div>
  );
};

export default ProductList;
