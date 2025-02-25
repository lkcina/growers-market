import React from 'react';
import { useAuth } from '../../Context/UseAuth';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import "./RegisterPage.css";
import { Link } from 'react-router-dom';

interface Props {
}

type RegisterFormsInputs = {
    email: string;
    userName: string;
    password: string;
    streetAddressLine1: string;
    streetAddressLine2: string;
    city: string,
    state: string,
    postalCode: string
}

const validation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    userName: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
    streetAddressLine1: Yup.string().required('Street Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    postalCode: Yup.string().required('Zip Code is required').matches(/^[0-9]{5}$/, 'Invalid Zip Code')
});

const RegisterPage: React.FC<Props> = () => {
    const { registerUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormsInputs>({ resolver: yupResolver(validation) });

    const handleRegister = (form: RegisterFormsInputs) => {
        console.log("Form Values:", form);
        console.log("Validation Errors:", errors);

        registerUser(form.email, form.userName, form.password, form.streetAddressLine1, form.streetAddressLine2, form.city, form.state, form.postalCode);
    };

    const states: string[] = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
    ];

    const stateAbbreviations: string[] = [  
        "AL", // Alabama  
        "AK", // Alaska  
        "AZ", // Arizona  
        "AR", // Arkansas  
        "CA", // California  
        "CO", // Colorado  
        "CT", // Connecticut  
        "DE", // Delaware  
        "FL", // Florida  
        "GA", // Georgia  
        "HI", // Hawaii  
        "ID", // Idaho  
        "IL", // Illinois  
        "IN", // Indiana  
        "IA", // Iowa  
        "KS", // Kansas  
        "KY", // Kentucky  
        "LA", // Louisiana  
        "ME", // Maine  
        "MD", // Maryland  
        "MA", // Massachusetts  
        "MI", // Michigan  
        "MN", // Minnesota  
        "MS", // Mississippi  
        "MO", // Missouri  
        "MT", // Montana  
        "NE", // Nebraska  
        "NV", // Nevada  
        "NH", // New Hampshire  
        "NJ", // New Jersey  
        "NM", // New Mexico  
        "NY", // New York  
        "NC", // North Carolina  
        "ND", // North Dakota  
        "OH", // Ohio  
        "OK", // Oklahoma  
        "OR", // Oregon  
        "PA", // Pennsylvania  
        "RI", // Rhode Island  
        "SC", // South Carolina  
        "SD", // South Dakota  
        "TN", // Tennessee  
        "TX", // Texas  
        "UT", // Utah  
        "VT", // Vermont  
        "VA", // Virginia  
        "WA", // Washington  
        "WV", // West Virginia  
        "WI", // Wisconsin  
        "WY"  // Wyoming  
    ];

    return (
        <div className="register-page">
            <form onSubmit={handleSubmit(handleRegister)}>
                <h1>Sign Up</h1>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="Email" {...register("email")} />
                    {errors.email ? (<p className="error">* {errors.email.message}</p>) : ""}
                </div>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" placeholder="Username" {...register("userName")} />
                    {errors.userName ? (<p className="error">* {errors.userName.message}</p>) : ""}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="Password" {...register("password")} />
                    {errors.password ? (<p className="error">* {errors.password.message}</p>) : ""}
                </div>
                <div className="address-form-inputs">
                    <p>Address</p>
                    <div>
                        <label htmlFor="street-address-line-1">Street Address</label>
                        <input id="street-address-line-1" type="text" placeholder="Street Address" {...register("streetAddressLine1")} />
                    </div>
                    <div>
                        <label htmlFor="street-address-line-2">Apt, Suite, etc.</label>
                        <input id="street-address-line-2" type="text" placeholder="Apt, Suite, etc." {...register("streetAddressLine2")} />
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input id="city" type="text" placeholder="City" required {...register("city")} />
                    </div>
                    <div>
                        <label htmlFor="state">State</label>
                        <select id="state" defaultValue="" {...register("state")}>
                            <option value="">Select a State</option>
                            {states.map((state, index) => <option key={`state-${index}`} value={stateAbbreviations[index]}>{state}</option>) }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="postal-code">Zip Code</label>
                        <input id="postal-code" type="text" inputMode="numeric" placeholder="12345" {...register("postalCode")} />
                    </div>
                </div>
                <button type="submit">Sign Up</button>
                <p>Already have an account? <Link to="/register">Login</Link></p>
            </form>
        </div>
    );
};

export default RegisterPage;