import { MIDTRANS_API_URL, MIDTRANS_CLIENT_ID } from './../../../../utils/const';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";

declare global {
    interface Window { snap: any; }
}

const useSnap = () => {
    const [snap, setSnap] = useState(null);

    useEffect(() => {
        const myMidtransClientKey = MIDTRANS_CLIENT_ID;
        const script = document.createElement('script');
        script.src = `${MIDTRANS_API_URL}/snap/snap.js`;
        script.setAttribute('data-client-key', myMidtransClientKey);
        script.onload = () => {
            console.log('Snap.js loaded');
            setSnap(window.snap);
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const snapEmbed = (snap_token: string, embedId : string, action : any) => {
        console.log('snapEmbed called with token:', snap_token);
        const snap: any = window.snap;
        if(snap){
            snap.embed(snap_token, {
                embedId,
                onSuccess: function (result : any) {
                    console.log('success', result);
                    action.onSuccess(result);
                },
                onPending: function(result : any){
                    console.log('pending', result);
                    action.onPending(result);
                },
                onClose: function () {
                    action.onClose();
                }
            })
        } else {
            console.log('Snap.js not loaded');
        }
    }

    return {snapEmbed}
}

export default useSnap;