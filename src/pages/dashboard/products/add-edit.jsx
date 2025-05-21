import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {getProductById, addProduct, editProduct} from "../../../api/products.js"
import { getAllCategories } from "../../../api/categories.js";

const AddEditForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data || []);
      } catch (err) {
        console.error(err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    setLoading(true);
    getProductById(id)
      .then((prod) => {
        setForm({
          title: prod.title,
          description: prod.description || "",
          price: prod.price,
          category: prod.category,
          image: null, 
        });
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((f) => ({ ...f, image: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const payload = new FormData();
      payload.append("title", form.title);
      payload.append("description", form.description);
      payload.append("price", form.price);
      payload.append("category", form.category);
      if (form.image) payload.append("image", form.image);

      if (isEdit) {
        await editProduct(id, payload);
      } else {
        await addProduct(payload);
      }
      navigate("/products");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        {isEdit ? "Edit Product" : "Add Product"}
      </Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <TextField
            label="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
            fullWidth
            required
            type="number"
            inputProps={{ step: "0.01" }}
          />
          <TextField
            select
            label="Category"
            name="category"
            value={form.category}
            onChange={handleChange}
            fullWidth
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" component="label">
            {isEdit ? "Change Image" : "Upload Image"}
            <input
              type="file"
              name="image"
              accept="image/*"
              hidden
              onChange={handleChange}
            />
          </Button>
          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {isEdit ? "Update" : "Add"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default AddEditForm;
