"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("22bb20ec-2f0e-4c8c-884c-3c48c6abb4a8");
    }, []);

    return null;
};