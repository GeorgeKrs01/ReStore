import LoadingComponent from "../../layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { fetchFilters, fetchProductsAsync, productSelectors, setProductParams } from "./catalogSlice";
import { Box, Grid, Pagination, Paper, TextField, Typography } from "@mui/material";
import CheckboxButtons from "../../components/CheckboxButtons";
import RadioButtonGroup from "../../components/RadioButtonGroup";

const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to Low' },
    { value: 'priceAsc', label: 'Price - Low to High' },
]

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status, filtersLoaded, brands, types, productParams } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])

    useEffect(() => {

        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded])

    if (status.includes('pending')) return <LoadingComponent message="Loading products..." />



    return (
        <Grid container spacing={4}>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2 }}>
                    <TextField
                        label='Search products'
                        variant="outlined"
                        fullWidth
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <RadioButtonGroup
                        selectedValue={productParams.orderBy}
                        options={sortOptions}
                        onChange={(e) => dispatch(setProductParams({ orderBy: e.target.value }))}
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButtons
                        items={brands}
                        checked={productParams.brands}
                        onChange={(items: string[]) => dispatch(setProductParams({ brands: items }))}
                    />
                </Paper>

                <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButtons
                        items={types}
                        checked={productParams.types}
                        onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
                    />
                </Paper>
            </Grid>
            <Grid item xs={9}>
                <ProductList products={products} />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={9}>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography>
                        Displaying 1-6 of 20 items
                    </Typography>
                    <Pagination
                        color="secondary"
                        size="large"
                        count={10}
                        page={2}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}