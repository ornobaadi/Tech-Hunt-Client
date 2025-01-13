import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal footer-center bg-neutral text-primary-content p-5">
            <aside>
                <img className="w-32" src="/logo 2.png" alt="" />
                <p className="font-bold text-xl">
                    Tech Hunt
                </p>
                <p>Providing reliable tech since 2025</p>
                <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                <nav>
                <div className="grid grid-flow-col my-4 gap-4 items-center *:text-2xl">
                    <a href="https://www.facebook.com/ajm.fajlayrabby"><FaFacebookSquare /></a>
                    <a href="https://www.linkedin.com/in/ornobaadi"><FaLinkedin /></a>
                    <a href="https://github.com/ornobaadi"><FaGithub /></a>
                </div>
            </nav>
            </aside>
            
        </footer>
    );
};

export default Footer;