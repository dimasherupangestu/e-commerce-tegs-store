import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const useLoginValidation = (isEmailValidation: boolean) => {
    const initialValue = {
        email: "",
        password: "",
    };

    const schema = yup.object().shape({
        email: yup.string().email("Invalid email format").required("Email is required"),
        ...(isEmailValidation ? {} : { password: yup.string().required("Password is required").min(3, "Password must be at least 3 characters") }),
    });

    const { control, handleSubmit, setValue } = useForm({
        defaultValues: initialValue,
        resolver: yupResolver(schema),
        mode: "all",
        reValidateMode: "onChange",
    });

    return { control, handleSubmit, setValue };
};
