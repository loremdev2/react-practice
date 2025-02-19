import { Input } from "@/components/ui/input";
import React , {useState} from "react";

import {z} from "zod";
const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[a-z]/, "Must contain a lowercase letter")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[0-9]/, "Must contain a number")
  .regex(/[^a-zA-Z0-9]/, "Must contain a special character");


const PasswordValidator = () => {
    const [password, setPassword]= useState("");
    const [isStrong, setIsStrong]= useState(false);

    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const newPassword= e.target.value;
        setPassword(newPassword);
        setIsStrong(passwordSchema.safeParse(newPassword).success);
    }


    return (
        <div className="flex flex-col items-center p-4 border rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Password Validator</h2>
            <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handleChange}
                
            />
            {isStrong!==null && (
                <p className={`text-sm dont-medium ${isStrong ? "text-green-600": "text-red-600"}`}></p>
            )}
        </div>
    )
}

export default PasswordValidator;