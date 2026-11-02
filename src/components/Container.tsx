import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn, scrollTo } from "@/lib/utils";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import styles from "@/styles/Container.module.css";
import { FileDown, Linkedin, Github } from "lucide-react";

type IconProps = {
  ["data-hide"]: boolean;
};

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

type NavProps = {
  text: string;
  href: string;
  i: number;
  className?: string;
};

const variants = {
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.12,
    },
  }),
  hidden: { opacity: 0 },
};

const navLinks = [
  { href: "#home", text: "Home" },
  { href: "#about", text: "About" },
  { href: "#skills", text: "Skills" },
  { href: "#projects", text: "Projects" },
  { href: "#services", text: "Services" },
  { href: "#contact", text: "Contact" },
];

function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  const href = e.currentTarget.getAttribute("href");

  if (href && href.startsWith("#")) {
    e.preventDefault();
    const section = document.querySelector(href);
    scrollTo(section);
  }
}

function NavItem(props: NavProps) {
  return (
    <motion.li
      className={props.className}
      variants={variants}
      custom={props.i}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <a
        href={props.href}
        onClick={handleClick}
        className={cn(props.i === 0 && "nav-active", "nav-link")}
      >
        {props.text}
      </a>
    </motion.li>
  );
}

export default function Container(props: ContainerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { children, ...customMeta } = props;
  const meta = {
    title: "Eniyavan M — Full-Stack Developer & Cloud Telemetry Specialist",
    description:
      "Portfolio of Eniyavan M: B.E. Computer Science graduate specializing in Python, FastAPI, AWS Cloud Telemetry, and High-Throughput RESTful Services.",
    image: "/assets/logo.webp",
    type: "website",
    ...customMeta,
  };

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // preloader effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="theme-color" content="#7B82FE" />
        <meta content={meta.description} name="description" />
        <link rel="canonical" href="https://eniyavan-portfolio-ca9w.vercel.app/" />
        <meta property="og:url" content="https://eniyavan-portfolio-ca9w.vercel.app/" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Eniyavan M Portfolio" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>
      <nav
        className={cn(
          styles.nav,
          isScrolled
            ? "bg-background/80 shadow-md backdrop-blur-md transition duration-300 border-b border-white/5"
            : "bg-transparent",
        )}
      >
        <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              styles.burger,
              "inline-flex transform items-center justify-center rounded-md p-2 transition-all duration-300 focus:outline-none",
            )}
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon data-hide={isOpen} />
            <CrossIcon data-hide={!isOpen} />
          </button>
        </div>
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-xl font-bold clash-grotesk tracking-tight text-gradient group-hover:opacity-90 transition">
            &lt;Eniyavan.M /&gt;
          </span>
          <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Open to Work
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden sm:flex items-center space-x-6">
          <ul className={styles["desktop-nav"]}>
            {navLinks.map((link, i) => (
              <NavItem
                key={link.href}
                href={link.href}
                text={link.text}
                i={i}
                className="text-base"
              />
            ))}
          </ul>

          <div className="flex items-center space-x-2">
            <Link
              href="https://github.com/Eniyavan-Tech"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-primary transition duration-200"
              title="GitHub Profile (@Eniyavan-Tech)"
            >
              <Github className="w-4 h-4" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/eniyavan-m-b49407290/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-muted-foreground hover:text-primary transition duration-200"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
            <a
              href="/assets/Eniyavan_M_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Eniyavan_M_Resume.pdf"
              className="inline-flex items-center text-xs font-medium px-3 py-1.5 rounded-md bg-white/5 hover:bg-primary hover:text-black border border-white/10 transition duration-300"
            >
              <FileDown className="w-3.5 h-3.5 mr-1.5" /> Resume
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence key="menu">
          {isOpen && (
            <motion.div
              className="fixed right-0 top-0 z-40 flex h-screen w-full flex-col justify-start overflow-y-hidden bg-background"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.15 }}
            >
              {/* Expandable menu */}
              <div className="flex h-20 max-h-20 min-h-[60px] w-full items-center justify-between border-b border-white/10 pl-[22px] pr-4">
                <span className="text-base font-medium clash-grotesk text-gradient">
                  Eniyavan M
                </span>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={styles.burger}
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Close menu</span>
                  <CrossIcon data-hide={!isOpen} />
                </button>
              </div>
              <div className="flex h-full flex-col items-start justify-between overflow-y-auto">
                {/* Links */}
                <ul className="flex min-h-fit w-full flex-col items-start space-y-6 px-[22px] py-[36px]">
                  {navLinks.map((link, i) => (
                    <button
                      key={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-left w-full"
                    >
                      <NavItem
                        href={link.href}
                        text={link.text}
                        i={i}
                        className="text-2xl"
                      />
                    </button>
                  ))}
                  <div className="pt-4 flex flex-col gap-3 w-full">
                    <Link
                      href="https://github.com/Eniyavan-Tech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary py-2"
                    >
                      <Github className="w-5 h-5" />
                      <span>GitHub (@Eniyavan-Tech)</span>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/eniyavan-m-b49407290/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary py-2"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span>LinkedIn Profile</span>
                    </Link>
                    <a
                      href="/assets/Eniyavan_M_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center text-sm font-medium px-4 py-2.5 rounded-md bg-primary text-black font-semibold transition"
                    >
                      <FileDown className="w-4 h-4 mr-2" /> Download Resume
                    </a>
                  </div>
                </ul>

                {/* Footer */}
                <div className="flex min-h-fit w-full flex-col space-y-4 px-[22px] py-10 border-t border-white/5">
                  <span className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Eniyavan M. All rights reserved.
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <style jsx global>{`
          html,
          body {
            overflow-y: ${isOpen ? "hidden" : "initial"};
            scrollbar-width: ${isOpen ? "none" : "unset"};
            -ms-overflow-style: ${isOpen ? "none" : "unset"};
            touch-action: ${isOpen ? "none" : "unset"};
            -ms-touch-action: ${isOpen ? "none" : "unset"};
          }
        `}</style>
      </nav>

      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Main content */}
      <main className={cn("container", props.className)}>{children}</main>
      <Footer />
    </>
  );
}

function MenuIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute h-5 w-5 text-neutral-100"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 2.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon(props: IconProps) {
  return (
    <svg
      className="absolute h-5 w-5 text-neutral-100"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
