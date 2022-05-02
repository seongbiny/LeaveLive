import type { NextPage } from "next";
import Link from 'next/link';
import navStyles from '../../styles/Nav.module.css';
import { useRouter } from "next/router";

const UserNav: NextPage = () => {
    const router = useRouter();
    console.log(router);
    return (
        <nav className={navStyles.nav}>
            {/* <img src="/vercel.svg" /> */}
            <div>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/reservation">
                    <a>reservation</a>
                </Link>
                <Link href="/bookmark">
                    <a>Bookmark</a>
                </Link>
                <Link href="/diary">
                    <a>Diary</a>
                </Link>
            </div>
            {/* <style jsx>{`
                nav {
                display: flex;
                gap: 10px;
                flex-direction: column;
                align-items: center;
                padding-top: 20px;
                padding-bottom: 10px;
                box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
                    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
                }
                img {
                max-width: 100px;
                margin-bottom: 5px;
                }
                nav a {
                font-weight: 600;
                font-size: 18px;
                }
                .active {
                color: tomato;
                }
                nav div {
                display: flex;
                gap: 10px;
                }
            `}</style> */}
        </nav>
    )
};

export default UserNav;
