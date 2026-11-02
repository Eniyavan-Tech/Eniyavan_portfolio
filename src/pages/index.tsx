import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Database,
  Cloud,
  Layers,
  Zap,
  Activity,
  FileDown,
  Linkedin,
  Github,
  GraduationCap,
  Award,
  ExternalLink,
  Cpu,
  Server,
  CheckCircle2,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const aboutStats = [
  { label: "B.E. CSE CGPA (Sathyabama)", value: "7.49" },
  { label: "Production Platforms Built", value: "3+" },
  { label: "API Read Latency Cut", value: "45%" },
  { label: "Cloud Waste Reduced", value: "20%" },
  { label: "SQL Query Speedup", value: "30%" },
  { label: "HSC Board Percentage", value: "75.8%" },
];

const projects = [
  {
    title: "SEVA – Food Sharing & Surplus Redistribution",
    category: "Full-Stack & Database Engineering",
    description:
      "Normalized 3NF relational database schema handling concurrent donor, NGO, and volunteer transactions. Implemented role-based access control and query optimization cutting latency by 30%.",
    image: "/assets/portfolio.webm",
    tags: ["Python", "Flask", "MySQL", "REST APIs", "Tailwind CSS"],
    href: "https://github.com/Eniyavan-Tech",
  },
  {
    title: "AWS Cost & Performance Optimisation Engine",
    category: "Cloud Telemetry & Predictive Analytics",
    description:
      "Automated real-time telemetry extraction for EC2 clusters using AWS CloudWatch and Boto3. Built regression models to identify idle compute resources, trimming cloud over-provisioning by 20%.",
    image: "/assets/infinitevps.webm",
    tags: ["AWS CloudWatch", "Boto3", "Python", "Flask", "Redis"],
    href: "https://github.com/Eniyavan-Tech",
  },
  {
    title: "TaskSync – High-Throughput API & Task Manager",
    category: "Asynchronous Microservices",
    description:
      "High-concurrency task queue service with Redis caching layers, dropping p95 read latency by 45%. Dockerized with automated CI/CD and comprehensive PyTest suite (>85% coverage).",
    image: "/assets/translate_bot.webm",
    tags: ["FastAPI", "PostgreSQL", "Redis", "Docker", "PyTest"],
    href: "https://github.com/Eniyavan-Tech",
  },
  {
    title: "Interactive 3D Engineering Portfolio",
    category: "Live Production Showcase",
    description:
      "My personal developer portfolio built with Next.js 14, Locomotive Scroll, Framer Motion, Spline 3D viewport, and real-time IST clock telemetry. Deployed live on Vercel.",
    image: "/assets/unqueue.webm",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Vercel", "Spline 3D"],
    href: "https://eniyavan-portfolio-ca9w.vercel.app/",
  },
];

const skillsCategories = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: ["Python", "JavaScript (ES6+)", "TypeScript", "SQL (PostgreSQL/MySQL)", "HTML5 & CSS3"],
  },
  {
    title: "Frameworks & Backend",
    icon: Server,
    skills: ["FastAPI", "Flask", "Next.js", "React", "RESTful Architecture", "PyTest"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS CloudWatch", "AWS EC2 & S3", "Boto3 SDK", "Docker Containerization", "Git & GitHub Actions"],
  },
  {
    title: "Databases & In-Memory",
    icon: Database,
    skills: ["PostgreSQL", "MySQL", "Redis (Caching)", "SQLite", "3NF Normalization & Indexing"],
  },
];

const services = [
  {
    service: "High-Throughput RESTful APIs",
    description:
      "Designing asynchronous, scalable microservices and resilient REST APIs using FastAPI and Flask with strict schema validation and JWT authentication.",
    icon: Zap,
  },
  {
    service: "Cloud Telemetry & Cost Optimization",
    description:
      "Automating infrastructure metrics collection via AWS CloudWatch and Boto3 Python SDK to identify idle compute and trim over-provisioned spend.",
    icon: Activity,
  },
  {
    service: "Database Architecture & Optimization",
    description:
      "Structuring 3NF relational schemas, composite indexing, and Redis in-memory caching to eliminate bottlenecks and drop query latency by up to 45%.",
    icon: Database,
  },
  {
    service: "Dockerized Microservice Deployment",
    description:
      "Packaging applications into secure, lightweight Docker containers with structured environment configs and CI/CD automated test suites.",
    icon: Layers,
  },
  {
    service: "Full-Stack Web Engineering",
    description:
      "Building reactive, responsive client interfaces with React, Next.js, and Tailwind CSS seamlessly integrated with modern backend services.",
    icon: Cpu,
  },
];

export default function Home() {
  const refScrollContainer = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      try {
        const Locomotive = (await import("locomotive-scroll")).default;
        new Locomotive({
          el: refScrollContainer.current ?? new HTMLElement(),
          smooth: true,
        });
      } catch (err) {
        console.warn("Locomotive scroll init fallback", err);
      }
    }

    function handleScroll() {
      let currentSection = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          currentSection = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");
        if (li.getAttribute("href") === `#${currentSection}`) {
          li.classList.add("nav-active");
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover tilt effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    if (tilt.length > 0) {
      VanillaTilt.init(tilt, {
        speed: 300,
        glare: true,
        "max-glare": 0.12,
        gyroscope: true,
        perspective: 900,
        scale: 0.98,
      });
    }
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Hero Section */}
        <section
          id="home"
          data-scroll-section
          className="mt-32 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-wrap items-center gap-2"
            >
              <span className={styles.pill}>Python</span>
              <span className={styles.pill}>FastAPI & Flask</span>
              <span className={styles.pill}>AWS & Boto3</span>
              <span className={styles.pill}>PostgreSQL & Redis</span>
              <span className={styles.pill}>Docker</span>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-5xl font-light tracking-tight text-foreground sm:text-6xl 2xl:text-7xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl font-bold tracking-tight sm:text-7xl 2xl:text-8xl">
                  Eniyavan M.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-3 max-w-xl text-base tracking-tight text-muted-foreground sm:text-lg 2xl:text-xl leading-relaxed"
              >
                Full-Stack Software Developer & Cloud Telemetry Specialist from Chennai, India.
                B.E. Computer Science graduate (CGPA 7.49) proficient in scalable RESTful APIs,
                high-throughput backend microservices, and automated cloud cost optimization.
              </p>
            </div>
            <div
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-wrap items-center gap-3 pt-4"
            >
              <Link href="mailto:eniyavan216@gmail.com" passHref>
                <Button className="font-medium shadow-lg shadow-primary/20">
                  Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>

              <Link
                href="https://github.com/Eniyavan-Tech"
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <Button variant="outline" className="border-white/10 hover:border-primary/50 gap-2">
                  <Github className="h-4 w-4" />
                  GitHub
                </Button>
              </Link>

              <Link
                href="https://www.linkedin.com/in/eniyavan-m-b49407290/"
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <Button variant="outline" className="border-white/10 hover:border-primary/50 gap-2">
                  <Linkedin className="h-4 w-4 text-[#0077b5]" />
                  LinkedIn
                </Button>
              </Link>

              <a
                href="/assets/Eniyavan_M_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Eniyavan_M_Resume.pdf"
              >
                <Button variant="outline" className="border-white/10 hover:border-primary/50 gap-2">
                  <FileDown className="h-4 w-4" />
                  Download CV
                </Button>
              </a>

              <Button
                variant="ghost"
                onClick={() => scrollTo(document.querySelector("#about"))}
                className="text-muted-foreground hover:text-foreground"
              >
                Explore Experience ↓
              </Button>
            </div>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to explore{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>

          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-12 h-[460px] w-full xl:mt-0 xl:h-[530px]"
          >
            <Suspense
              fallback={
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    <span className="text-sm">Loading 3D Scene...</span>
                  </div>
                </div>
              }
            >
              <Spline scene="/assets/scene.splinecode" />
            </Suspense>
          </div>
        </section>

        {/* About & Education */}
        <section id="about" data-scroll-section className="my-24">
          <div
            data-scroll
            data-scroll-speed=".3"
            data-scroll-position="top"
            className="flex max-w-6xl flex-col justify-start space-y-12"
          >
            <div>
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-wider uppercase">
                About & Background
              </span>
              <h2 className="mt-3 text-3xl font-light leading-snug tracking-tight text-foreground sm:text-4xl xl:text-[40px]">
                Engineering high-performance software with strong foundations in{" "}
                <span className="text-gradient font-medium clash-grotesk">
                  Python, AWS Cloud Architecture, and Database Systems
                </span>.
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-4xl">
                I am a Computer Science graduate from Sathyabama Institute of Science and Technology,
                dedicated to architecting robust web platforms. From optimizing relational schemas in MySQL/PostgreSQL
                and slashing p95 latency via Redis, to harvesting real-time compute metrics using AWS CloudWatch and Boto3,
                I focus on high reliability, resource efficiency, and clean system design.
              </p>
            </div>

            {/* Education & Certifications Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-white/5 bg-white/[2%] p-6 backdrop-blur">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Education</h3>
                    <p className="text-xs text-muted-foreground">Academic credentials</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary/40 pl-3">
                    <p className="font-medium text-foreground text-sm">B.E. in Computer Science and Engineering</p>
                    <p className="text-xs text-muted-foreground">Sathyabama Institute of Science & Technology · 2022–2026</p>
                    <p className="text-xs font-semibold text-emerald-400 mt-0.5">CGPA: 7.49 / 10</p>
                  </div>
                  <div className="border-l-2 border-white/10 pl-3">
                    <p className="font-medium text-foreground text-sm">Higher Secondary Certificate (HSC - 12th)</p>
                    <p className="text-xs text-muted-foreground">Cheran Matriculation Hr. Sec. School · 2021–2022</p>
                    <p className="text-xs font-semibold text-emerald-400 mt-0.5">Score: 75.8%</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[2%] p-6 backdrop-blur">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">Industry Certifications</h3>
                    <p className="text-xs text-muted-foreground">Verified technical proficiencies</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Postman API Fundamentals Student Expert</p>
                      <p className="text-xs text-muted-foreground">REST API testing, collections, mock servers, & automated test assertions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">NPTEL – Database Management Systems (DBMS)</p>
                      <p className="text-xs text-muted-foreground">Relational algebra, 3NF/BCNF normalization, indexing, transaction ACID properties</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">NPTEL – Introduction to Machine Learning</p>
                      <p className="text-xs text-muted-foreground">Statistical modeling, regression heuristics, and predictive telemetry analysis</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Numerical Metrics */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 xl:grid-cols-6 pt-4">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-lg border border-white/5 bg-white/[1.5%] p-4 text-center hover:bg-white/[3%] transition"
                >
                  <span className="clash-grotesk text-gradient text-3xl font-bold tracking-tight xl:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 text-xs tracking-tight text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" data-scroll-section className="my-24">
          <div data-scroll data-scroll-speed=".3" className="flex flex-col space-y-10">
            <div>
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-wider uppercase">
                Technical Stack
              </span>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
                Tools & technologies I work with.
              </h2>
              <p className="mt-2 text-muted-foreground max-w-2xl">
                A structured breakdown of my hands-on technical proficiencies across software development, cloud infrastructure, and database systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {skillsCategories.map((cat) => (
                <div
                  key={cat.title}
                  className="rounded-xl border border-white/5 bg-white/[2%] p-6 backdrop-blur hover:border-primary/30 transition duration-300"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <cat.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-base text-foreground">{cat.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {cat.skills.map((skill) => (
                      <li key={skill} className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                        <span className="hover:text-foreground transition">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Showcase */}
        <section id="projects" data-scroll-section className="my-28">
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>

          <div data-scroll data-scroll-speed=".3">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-wider uppercase">
              Featured Work
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-5xl">
              Scalable platforms & distributed systems.
            </h2>
            <p className="mt-2 text-base text-muted-foreground max-w-2xl">
              Engineered with a focus on database performance, high throughput, and automated cloud telemetry.
            </p>

            {/* Carousel */}
            <div className="mt-12">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem key={project.title} className="md:basis-1/2">
                      <Card id="tilt" className="overflow-hidden border border-white/10 bg-background/60 backdrop-blur-md">
                        <CardHeader className="p-0 relative group">
                          <Link href={project.href} target="_blank" rel="noopener noreferrer">
                            <video
                              src={project.image}
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="aspect-video h-full w-full bg-primary/10 object-cover transition duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                            <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur border border-white/10 text-white/80 group-hover:text-primary transition">
                              <ExternalLink className="w-4 h-4" />
                            </div>
                          </Link>
                        </CardHeader>
                        <CardContent className="p-6 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                              {project.category}
                            </span>
                          </div>
                          <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                            {project.title}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/5 text-slate-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
              <div className="py-4 text-center text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {current} / {count}
                </span>{" "}
                featured projects · Slide to view all
              </div>
            </div>
          </div>
        </section>

        {/* Services & Capabilities */}
        <section id="services" data-scroll-section className="my-24">
          <div
            data-scroll
            data-scroll-speed=".3"
            data-scroll-position="top"
            className="flex flex-col space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col justify-center rounded-xl border border-primary/20 bg-primary/5 p-8 shadow-sm">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Engineering Capabilities
                </span>
                <h2 className="mt-2 text-3xl font-medium tracking-tight">
                  High-Impact
                  <br />
                  <span className="text-gradient clash-grotesk font-bold">
                    Solutions Delivered.
                  </span>
                </h2>
                <p className="mt-3 text-sm text-secondary-foreground leading-relaxed">
                  Specialized in asynchronous microservices, database tuning, and cloud telemetry pipelines built for scale and cost-efficiency.
                </p>
              </div>

              {services.map((service) => (
                <div
                  key={service.service}
                  className="flex flex-col items-start justify-between rounded-xl border border-white/5 bg-white/[2%] p-8 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-white/[4%]"
                >
                  <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4">
                    <service.icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {service.service}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" data-scroll-section className="my-28">
          <div
            data-scroll
            data-scroll-speed=".3"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-primary/[8%] via-background to-white/[2%] px-6 py-16 text-center sm:px-12 xl:py-20 backdrop-blur"
          >
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
              Open to Opportunities · Full-Time / SDE Intern
            </span>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl xl:text-6xl">
              Let&apos;s build scalable systems{" "}
              <span className="text-gradient clash-grotesk">together.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base leading-relaxed">
              Whether you are hiring for Full-Stack, Backend Python, or Cloud Telemetry roles,
              I am ready to bring immediate value to your engineering team.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              <Link href="mailto:eniyavan216@gmail.com" passHref>
                <Button size="lg" className="font-semibold shadow-lg shadow-primary/20">
                  Email Me: eniyavan216@gmail.com
                </Button>
              </Link>
              <Link
                href="https://github.com/Eniyavan-Tech"
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <Button size="lg" variant="outline" className="border-white/10 hover:border-primary/50 gap-2">
                  <Github className="w-4 h-4" /> GitHub: @Eniyavan-Tech
                </Button>
              </Link>
              <Link
                href="https://www.linkedin.com/in/eniyavan-m-b49407290/"
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                <Button size="lg" variant="outline" className="border-white/10 hover:border-primary/50 gap-2">
                  <Linkedin className="w-4 h-4 text-[#0077b5]" /> Connect on LinkedIn
                </Button>
              </Link>
              <a
                href="/assets/Eniyavan_M_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Eniyavan_M_Resume.pdf"
              >
                <Button size="lg" variant="secondary" className="gap-2">
                  <FileDown className="w-4 h-4" /> Download Resume
                </Button>
              </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              📍 Chennai, Tamil Nadu, India · 📞 +91 9952465467
            </p>
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".15"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] pointer-events-none">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".15"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
