/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { APIWithToken } from "../../../libs/axios";
import useAuthStore from "../../../store/useAuthStore";
import useShoppingCart from "../../shoppingCart/hooks/useShoppingCart";
import useDeliveryStore from "../../../store/useDeliveryStore";

const useDelivery = () => {
    const user = useAuthStore((state) => state.user);
    const { productsInShoppingCart } = useShoppingCart();
    const { products } = productsInShoppingCart;

    const [loading, setLoading] = useState<boolean>(false);
    const [totalWeight, setTotalWeight] = useState<number>(0);
    const [deliveryResults, setDeliveryResults] = useState<any[]>([]);

    const selectedCourier = useDeliveryStore((state) => state.selectedCourier);
    const selectedService = useDeliveryStore((state) => state.selectedService);
    const setSelectedCourier = useDeliveryStore((state) => state.setSelectedCourier);
    const setSelectedService = useDeliveryStore((state) => state.setSelectedService);

    const [data, setData] = useState({
        destination: user?.city_id || '',
        weight: totalWeight,
        courier: selectedCourier,
    });

    const calculateTotalWeight = () => {
        return products.reduce((totalWeight, item) => {
            const weightPerItem = item.products.weight || 0;
            const totalItemWeight = item.quantity * weightPerItem;
            return totalWeight + totalItemWeight;
        }, 0);
    };

    const fetchDeliveryCost = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('destination', data.destination.toString());
            formData.append('weight', data.weight.toString());
            formData.append('courier', data.courier);
            // for (const [key, value] of formData.entries()) {
            //     console.log(`${key}: ${value}`);
            // }
            const response = await APIWithToken.post('/raja-ongkir/cost', formData);
            // console.log(response)
            setDeliveryResults(response.data.data.rajaongkir.results);
        } catch (error) {
            console.error('Error fetching delivery cost:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCourierChange = (value: string) => {
        setSelectedCourier(value);
        setData((prevState) => ({
            ...prevState,
            courier: value
        }));
    };

    const handleServiceChange = (serviceCode: string, cost: any) => {
        setSelectedService(cost);
    };

    useEffect(() => {
        const newTotalWeight = calculateTotalWeight();
        setTotalWeight(newTotalWeight);

        setData((prevData) => ({
            ...prevData,
            weight: newTotalWeight,
        }));

        if (data.courier) {
            fetchDeliveryCost();
        }
    }, [products, data.courier]);

    return {
        deliveryResults,
        handleCourierChange,
        handleServiceChange,
        loading,
        selectedCourier,
        selectedService,
    };
};

export default useDelivery;
