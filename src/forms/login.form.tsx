import {Button, Form, Input} from "@heroui/react";
import * as React from "react";

interface IProps {
    onClose: () => void;
}


const RegistrationForm = ({onClose}: IProps) => {
    const errors = [];
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);

        onClose()
    }

    const onChange = (e: { target: { name: string; value: string; }; }) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

        return (
            <Form className={" flex flex-col gap-7 w-full"} onSubmit={onSubmit}>
            <Input
                isRequired
                aria-label="Email"
                errorMessage="Please enter a valid email"
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your email"
                type="email"
                value={formData.email}
                onChange={onChange}

            />

            <Input
                isRequired
                aria-label="Password"
                label="Password"
                labelPlacement="outside"
                name="password"
                placeholder="Enter your password"
                type="password"
                value={formData.password}
                onChange={onChange}
                validate={(value)=>{
                    if (value.length < 4) {
                        return( "Password must be 4 characters or more. ")
                }
                    if ((value.match(/[A-Z]/g) || []).length < 1) {
                        return ("Password must include at least 1 upper case letter")
                    }
                    if ((value.match(/[^a-z]/gi) || []).length < 1) {
                        return( "Password must include at least 1 symbol or number.")
                    }
                }}
            />

            <Input
                isRequired
                aria-label="Confirm password"
                label="Confirm Password"
                labelPlacement="outside"
                name="confirmPassword"
                placeholder="Confirm your password"
                type="password"
                value={formData.confirmPassword}
                onChange={onChange}
                validate={(value)=>{
                    if (!value) {
                        return( "Confirm your password")
                    }
                    if (value !== formData.password) {
                        return ("The passwords don’t match.")
                    }
                }}
            />

            <div className="flex flex-col justify-center items-center w-full gap-5">
                <Button className="w-full" type="button" onPress={onClose}>Cancel</Button>

                <Button className="w-full" type="submit">Sign Up</Button>
            </div>

        </Form>)
}
export default RegistrationForm;