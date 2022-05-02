import UserNav from "./UserNav";

export default function Layout({children}: any){
    return(
        <>
            <UserNav />
            <div>{children}</div>
        </>
    )
}