
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useRef } from "react";
import { checkArrays } from "../lib/utils";
import Loader from "./Loader";

export function UserProfile() {


    const { authUser, isUpdatingProfile, updateProfile, resetUserPlan } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const fileInputRef = useRef(null);

    function handleClick() {
        fileInputRef.current.click()
    }

    async function handleReset() {
        await resetUserPlan(authUser._id)
    }


    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };



    return (
        <div className="user-profile">
            <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                onClick={handleClick}
            />

            <input
                ref={fileInputRef}
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
            />

            <ul>
                <li>{authUser.fullName}</li>
                <li>{authUser.email}</li>
                {checkArrays(authUser) && <li><button onClick={handleReset} className="btn">reset</button></li>}
            </ul>

        </div>
    )
}