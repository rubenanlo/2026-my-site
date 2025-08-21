"use client";

import BlogPosts from "@/components/BlogPosts";
import Logo from "@/components/Logo";
import Projects from "@/components/Projects";
import SectionHero from "@/components/SectionHero";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="flex flex-col items-center sm:items-start">
      <SectionHero />
      <Projects />
      <Skills />
      <BlogPosts />
      <Logo />
    </main>
  );
}
