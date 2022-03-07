import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";

import { Bullet } from "../Bullet";

import { Container, ImageIndexes, CarImageWrapper, CarImage } from "./styles";

interface Props {
  imagesUrl: {
    id: string;
    photo: string;
  }[];
}

interface ChangeImageProps {
  viewableItems: ViewToken[];
  changed: ViewToken[];
}
export function ImageSlider({ imagesUrl }: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const indexChanged = useRef((info: ChangeImageProps) => {
    setImageIndex(info.viewableItems[0].index!);
  });
  return (
    <Container>
      <ImageIndexes>
        {imagesUrl.map((item, index) => (
          <Bullet
            key={String(item.id)}
            active={imageIndex === index ? true : false}
          />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
        renderItem={({ item }) => {
          return (
            <CarImageWrapper>
              <CarImage source={{ uri: item.photo }} resizeMode="contain" />
            </CarImageWrapper>
          );
        }}
      />
    </Container>
  );
}
