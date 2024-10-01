import * as yup from "yup";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

export const useRequestVerificationValidation = () => {
    const initialValue = {
        email: ""
    }

    const schema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("Email is required")
    })

    const { control, handleSubmit } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
        mode: "onBlur",
        reValidateMode: "onChange"
    });

    return { control, handleSubmit }
};