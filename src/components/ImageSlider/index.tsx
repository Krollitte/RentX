import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";

import { Bullet } from "../Bullet";

import { Container, ImageIndexes, CarImageWrapper, CarImage } from "./styles";

interface Props {
  imagesUrl: string[];
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
        {imagesUrl.map((_, index) => (
          <Bullet
            key={String(index)}
            active={imageIndex === index ? true : false}
          />
        ))}
      </ImageIndexes>

      <FlatList
        data={imagesUrl}
        keyExtractor={(key) => key}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={indexChanged.current}
        renderItem={({ item }) => {
          return (
            <CarImageWrapper>
              <CarImage source={{ uri: item }} resizeMode="contain" />
            </CarImageWrapper>
          );
        }}
      />
    </Container>
  );
}
