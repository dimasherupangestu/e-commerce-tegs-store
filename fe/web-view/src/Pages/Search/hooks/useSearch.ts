import { useEffect, useState } from "react";
import { API } from "../../../libs/axios";
import { useNavigate } from "react-router-dom";
import useProductsResult from "../../../store/useProductsResult";

const useSearch = () => {
    const navigate = useNavigate();
    const setProductsResult = useProductsResult((state) => state.setProductsResult);
    const productsResult = useProductsResult((state) => state.productsResult);
    
    const [searchParams, setSearchParams] = useState({
        query: "",
        min_price: "",
        max_price: "",
        sort: "",
        page: 1,
        limit: 10
    });

    const fetchsProducts = async () => {
        try {
            // console.log("Fetching products with params:", searchParams);
            const response = await API.get("/search-products", {
                params: {
                    product_name: searchParams.query,
                    description: searchParams.query,
                    category_name: searchParams.query,
                    min_price: searchParams.min_price,
                    max_price: searchParams.max_price,
                    sort: searchParams.sort,
                    page: searchParams.page,
                    limit: searchParams.limit
                }
            });

            console.log("Setting productsResult:", response.data);
            setProductsResult({
                data: response.data.data,
                total: response.data.total,
                currentPage: response.data.currentPage,
                totalPages: response.data.totalPages
            });
        } catch (error) {
            console.log("Error getting products:", error);
        }
    };

    const handleSearch = () => {
        fetchsProducts();
        navigate(`/search?query=${searchParams.query}`);
    };

    useEffect(() => {
        // console.log("Fetching products due to change in searchParams:", searchParams);
        if (searchParams.query) {
            fetchsProducts();
        }
    }, [searchParams.page, searchParams.query, searchParams.min_price, searchParams.max_price, searchParams.sort]);
    

    const handlePageChange = (page: number) => {
        console.log("Changing page to:", page);
        setSearchParams(prevParams => ({
            ...prevParams,
            page: Math.max(1, Math.min(page, productsResult.totalPages))
        }));
        fetchsProducts();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchParams(prevParams => ({
            ...prevParams,
            query: value
        }));
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchParams(prevParams => ({
            ...prevParams,
            sort: e.target.value
        }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return {
        handleInputChange,
        handleSortChange,
        fetchsProducts,
        searchParams,
        handleKeyDown,
        handleSearch,
        handlePageChange
    };
};

export default useSearch;
