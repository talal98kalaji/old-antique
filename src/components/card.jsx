import React from "react";
import { Card, CardMedia, CardContent, CardActions, Button, Typography, Grid, Container } from "@mui/material";


const ReuseableCard = ({ items, onEdit, onDelete, baseUrl }) => {
  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={2}>
        {items.map(item => (
          <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image ? `${baseUrl}${item.image}` : "/placeholder.png"}
                alt={item.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description || "No description available"}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  Price: {item.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => onEdit(item.id)}>
                  Edit
                </Button>
                <Button size="small" color="error" onClick={() => onDelete(item.id)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ReuseableCard
