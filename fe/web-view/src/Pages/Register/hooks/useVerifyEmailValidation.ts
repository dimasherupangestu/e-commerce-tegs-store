import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const useVerifyEmailValidation = () => {
    const initialValue = {
        code: ""
    };

    const schema = yup.object().shape({
        code: yup
            .string()
            .required("Verification code is required")
            .matches(/^\d+$/, "Verification code must be numeric")
            .length(6, "Verification code must be exactly 6 digits")
    });

    const { control, handleSubmit} = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
        mode: "all",
        reValidateMode: "onChange"
    });

    return { control, handleSubmit};
};
