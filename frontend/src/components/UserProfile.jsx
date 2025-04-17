
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useRef } from "react";

export function UserProfile() {


    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);

    const fileInputRef = useRef(null);

    function handleClick() {
        fileInputRef.current.click()
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

    if (isUpdatingProfile)
        return <div>Loading...</div>

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
            </ul>

        </div>
    )
}