import AddressDialog from "../components/AddressDialog";

export const metadata = {
    title: "Address | theLoudKitchens",
}

export default function Layout({ children }) {
    return (
        <>
            {children}
            <AddressDialog />
        </>
    )
}
