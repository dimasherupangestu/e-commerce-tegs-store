import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const useFormRegister = () => {
    const initialValue = {
        full_name: "",
        password: "",
    };

    const schema = yup.object().shape({
        full_name: yup.string().required("Full name is required").min(3, "Full name must be at least 3 characters"),
        password: yup.string().required("Password is required").min(3, "Password must be at least 3 characters"),
    });

    const { control, handleSubmit} = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
        mode: "all",
        reValidateMode: "onChange"
    });

    return { control, handleSubmit};
};
