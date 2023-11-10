import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import {ClerkProvider} from '@clerk/nextjs'
import {ModalProvider} from "@/components/modal-provider";
import {ToasterProvider} from "@/components/toaster-provider";
import {CrispProvider} from "@/components/crisp-provider";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Leonidas Ai',
    description: 'Ai tool to try everything AI is capable of doing!',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
            <CrispProvider />
            <body className={inter.className}>
            <ToasterProvider />
            <ModalProvider />
                {children}
            </body>
            </html>
        </ClerkProvider>
    )
}
