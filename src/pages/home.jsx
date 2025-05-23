import React, { useEffect, useState } from "react";
import { Container } from "@mui/material";
import ReuseableCard from '../components/card.jsx';
import { getAllProducts } from "../api/products.js";

const HomePage = () => {
  const [products , setProducts] = useState([])
  const [filters , setFilters] = useState({title:"",price:"",category:"",})
  const getProducts = async ()=>{
    const data = await getAllProducts(filters);
    setProducts(data.result || [])
  }
  useEffect(()=>{getProducts()},[filters])
  return (
    <Container sx={{ mt: 2 }}>
      
    </Container>
  );
};


export default HomePage;

