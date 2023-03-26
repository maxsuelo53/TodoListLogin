import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

import { useState, useEffect } from "react";

//ICONES
import { FaUserAlt } from "react-icons/fa"
import { IoLogOut, IoClose } from "react-icons/io5"
import { HiOutlineLogin, HiMenu } from "react-icons/hi"
import { GoSignIn } from "react-icons/go"
import { FcSurvey } from "react-icons/fc"
import { MdDashboard, MdInfo } from "react-icons/md"

import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

const Navbar = () => {

    const { user } = useAuthValue();
    const { logout } = useAuthentication();
    const [menuMobile, setMenuMobile] = useState(false);

    const [nomeUser, setNomeUser] = useState("");

    useEffect(() => {
        if (user)
            setNomeUser(user.displayName)
    }, [user])

    const closeMenuMobile = () => {
        setMenuMobile(false);
        logout();
    }


    return (
        <>
            <nav className={styles.navBarContent}>
                <ul className={styles.menuItemsNav}>
                    <NavLink to={'/'} className={styles.menuLogo} >
                        <FcSurvey />
                        Todo<span>List</span>
                    </NavLink>
                    <div className={styles.itemsNavigation}>
                        <li className={styles.menuItem}>
                            <NavLink to={"/"} className={({ isActive }) => (isActive ? styles.linkActive : "")}>
                                <MdDashboard />
                                Tarefas
                            </NavLink>
                        </li>
                        <li className={styles.menuItem}>
                            <NavLink to={"/about"} className={({ isActive }) => (isActive ? styles.linkActive : "")}>
                                <MdInfo />
                                Sobre
                            </NavLink>
                        </li>
                    </div>
                    <div className={styles.itemsNavigation}>
                        {!user && (
                            <>
                                <li className={`${styles.menuItem} ${styles.buttonLogin} btn`}>
                                    <NavLink to={"/login"}> <HiOutlineLogin /> Login</NavLink>
                                </li>
                                <li className={`${styles.menuItem} btn ${styles.buttonRegister}`}>
                                    <NavLink to={"/register"}><GoSignIn /> Cadastro</NavLink>
                                </li>
                            </>
                        )}
                        {user && (
                            <>
                                <li className={styles.nameUser}>
                                    <p>Olá, {nomeUser}! </p>
                                    <FaUserAlt />
                                </li>
                                <li>
                                    <button onClick={logout} className={`btn ${styles.buttonLogout}`}>
                                        <span>Sair</span>
                                        <IoLogOut />
                                    </button>

                                </li>
                            </>
                        )}
                    </div>
                    <li className={styles.menuMobileOpen}>
                        <HiMenu onClick={() => setMenuMobile(true)} />
                    </li>
                </ul>
            </nav>
            {/* MENU MOBILE */}
            {menuMobile && (

                <div className={styles.menuContentMobile}>
                    <NavLink to={'/'} className={styles.menuLogo} >
                        <FcSurvey />
                        Todo<span>List</span>
                    </NavLink>
                    <div className={styles.closeMenuMobile}>
                        <IoClose onClick={() => setMenuMobile(false)} />
                    </div>
                    <ul>
                        {user && (
                            <>
                                <div className={styles.userInfoMobile}>
                                    <li className={styles.nameUser}>
                                        <p>Olá, {nomeUser}! </p>
                                        <FaUserAlt />
                                    </li>
                                </div>
                            </>
                        )}
                        <li className={styles.menuItem}>
                            <NavLink to={"/"} className={({ isActive }) => (isActive ? styles.linkActive : "")} onClick={() => setMenuMobile(false)}>Tarefas</NavLink>
                        </li>
                        <li className={styles.menuItem}>
                            <NavLink to={"/about"} className={({ isActive }) => (isActive ? styles.linkActive : "")} onClick={() => setMenuMobile(false)}>Sobre</NavLink>
                        </li>
                        <div className={styles.contentInfoUser}>
                            {!user && (
                                <>
                                    <div className={styles.contentMobileLoginRegister}>
                                        <li className={`${styles.menuItem} ${styles.itemLoginMobile} btn`} onClick={() => setMenuMobile(false)}>
                                            <NavLink to={"/login"} > <HiOutlineLogin /> Login</NavLink>
                                        </li>
                                        <li className={`${styles.menuItem} ${styles.itemRegisterMobile} btn`} onClick={() => setMenuMobile(false)} >
                                            <NavLink to={"/register"} ><GoSignIn /> Cadastro</NavLink>
                                        </li>
                                    </div>
                                </>
                            )}
                            {user && (
                                <>
                                    <div className={styles.userLogout}>
                                        <li>
                                            <button onClick={() => closeMenuMobile()} className={`btn ${styles.buttonLogout}`}>
                                                <span>Sair</span>
                                                <IoLogOut />
                                            </button>

                                        </li>
                                    </div>
                                </>
                            )}
                        </div>
                    </ul>
                </div>
            )}
        </>
    )
}

export default Navbar;