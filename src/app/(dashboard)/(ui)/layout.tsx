import AppHeader from "@/components/common/app-header"
import React from 'react';
export default async function Layout({
    children
}:Readonly<{
    children:React.ReactNode
}>) {
    return(
        <div className="flex flex-col flex-1">
        <AppHeader />
        {children}
        </div>
    );
};