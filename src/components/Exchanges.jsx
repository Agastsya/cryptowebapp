import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../index";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "./Loader";
import ExchangeCard from "./ExchangeCard";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchExchanges = async () => {
      const { data } = await axios.get(`${server}/exchanges?per_page=250`);
      setExchanges(data);
      console.log(data);
      setLoading(false);
    };
    fetchExchanges();
  }, []);
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"}>
            {exchanges.map((i) => (
              <ExchangeCard
                name={i.name}
                rank={i.trust_score_rank}
                img={i.image}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Exchanges;
