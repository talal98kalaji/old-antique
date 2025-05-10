// components/ReuseableCard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Container
} from "@mui/material";
import { getAllProducts, deleteProduct } from "../api/products";

const ReuseableCard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const BASE_URL = "https://talalkalaji.pythonanywhere.com"; 

  // جلب البيانات
  const getData = () => {
    getAllProducts()
      .then(data => setProducts(data.results))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleEdit = id => navigate(`add-edit/${id}`);
  const handleDelete = async id => {
    try {
      const status = await deleteProduct(id);
      if (status === 204 || status === "ok") getData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid 
            item 
            key={product.id} 
            xs={12}    // 1 بطاقة في الهواتف
            sm={6}     // 2 بطاقات في الشاشات المتوسطة 
            md={4}     // 3 بطاقات في الشاشات الأكبر 
            lg={2}     // 6 بطاقات في الشاشات الكبيرة جداً (12/2=6)
          >
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="140"                   // ارتفاع ثابت للصور
                image={product.image 
                  ? `${BASE_URL}${product.image}` 
                  : "/placeholder.png"}
                alt={product.title}
                sx={{
                  objectFit: "cover"           // يملأ البطاقة مع قصّ الجزء الزائد
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description || "لا توجد تفاصيل"}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  السعر: {product.price} د.ل
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleEdit(product.id)}>
                  تعديل
                </Button>
                <Button 
                  size="small" 
                  color="error" 
                  onClick={() => handleDelete(product.id)}
                >
                  حذف
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ReuseableCard;
