import AddressDialog from "../components/AddressDialog";

export default function Layout({ children }) {
    return (
        <>
            {children}
            <AddressDialog />
        </>
    )
}
