/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { APIWithToken } from "../../../libs/axios"
import useSnap from "./useSnap";
import { useNavigate } from "react-router-dom";
import useDelivery from "./useDelivery";
// import { IPay } from "../../../types/IPay";

export function useCheckout() {
    const navigate = useNavigate();
    const {snapEmbed} = useSnap();
    const [show, setSnapShow] = React.useState(false);
    const { selectedService } = useDelivery();
    // const [data, setData] = React.useState<IPay>({
    //     user_email: "",
    //     customer_name: "",
    // });

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setData({
    //         ...data,
    //         [event.target.name]: event.target.value
    //     })
    // }

    const pay = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await APIWithToken.post("/transaction", {
                delivery_details: selectedService,
            });
            console.log(response);
            if (response && response.status === 200) {
                setSnapShow(true);
                setTimeout(() => {
                    const snapContainer = document.getElementById('snap-container');
                    if (snapContainer) {
                        snapEmbed(response.data.data.snap_token, 'snap-container', {
                            onSuccess: function (result: any) {
                                console.log("success", result);
                                // navigate(`/order-status?transaction_id=${response.data.data.id}`);
                            },
                            onPending: function (result: any) {
                                console.log('pending', result);
                                // navigate(`/order-status?transaction_id=${response.data.data.id}`);
                                setSnapShow(false);
                            },
                            onClose: function () {
                                // navigate(`/order-status?transaction_id=${response.data.data.id}`);
                                setSnapShow(false);
                            }
                        });
                    } else {
                        console.log('Element snap-container not found after timeout');
                    }
                }, 100);
            } else if (response && response.status === 400) {
                alert(response.data.message);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    }
    
    

    return {
        // data,
        // handleChange
        pay,
        show
    }
}