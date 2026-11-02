import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MailIcon, Linkedin, FileDown, Github } from "lucide-react";

export default function Footer() {
  // get the current time in IST (UTC+5:30)
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: true,
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full border-t border-white/5 bg-gradient-to-t from-primary/[3%] to-transparent mt-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-8 gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            Crafted by{" "}
            <span className="font-semibold text-foreground">
              Eniyavan M
            </span>
          </p>
          <hr className="hidden h-5 border-l border-muted sm:flex" />
          <span className="flex items-center space-x-1.5 text-xs text-muted-foreground">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Chennai, IN:</span>
            <span className="font-mono font-medium text-foreground">{time || "Loading..."} IST</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Link
            href="https://github.com/Eniyavan-Tech"
            target="_blank"
            rel="noopener noreferrer"
            passHref
          >
            <Button variant="outline" size="sm" className="gap-1.5 border-white/10 hover:border-primary/50">
              <Github className="h-4 w-4" />
              <span className="text-xs">GitHub</span>
            </Button>
          </Link>

          <Link
            href="https://www.linkedin.com/in/eniyavan-m-b49407290/"
            target="_blank"
            rel="noopener noreferrer"
            passHref
          >
            <Button variant="outline" size="sm" className="gap-1.5 border-white/10 hover:border-primary/50">
              <Linkedin className="h-4 w-4 text-[#0077b5]" />
              <span className="text-xs">LinkedIn</span>
            </Button>
          </Link>

          <Link
            href="mailto:eniyavan216@gmail.com"
            passHref
          >
            <Button variant="outline" size="sm" className="gap-1.5 border-white/10 hover:border-primary/50">
              <MailIcon className="h-4 w-4 text-primary" />
              <span className="text-xs">eniyavan216@gmail.com</span>
            </Button>
          </Link>

          <a
            href="/assets/Eniyavan_M_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Eniyavan_M_Resume.pdf"
          >
            <Button variant="outline" size="sm" className="gap-1.5 border-white/10 hover:border-primary/50">
              <FileDown className="h-4 w-4" />
              <span className="text-xs">Resume PDF</span>
            </Button>
          </a>
        </div>
      </div>
      <div className="h-1 bg-[radial-gradient(closest-side,#8486ff,#42357d,#5d83ff,transparent)] opacity-40" />
    </footer>
  );
}
