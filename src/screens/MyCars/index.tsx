import React, { useState, useEffect } from "react";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

import { Container } from "./styles";

export function MyCars() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/schedules_bycars/?user_id=1");
        setCars(response.data);
      } catch (err) {
        console.error("Não foi possível carregar", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);
  return <Container></Container>;
}
