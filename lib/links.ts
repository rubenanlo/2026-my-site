import Button from "@/components/Button";
import { GitHubIcon, LinkedInIcon } from "@/components/Icons";

type Link = {
  label: string;
  href: string;
  target?: string;
  component: React.ComponentType<{
    className?: string;
    children?: React.ReactNode;
  }>;
  icon: boolean;
  text?: string;
};

export const links: Link[] = [
  {
    label: "GitHub",
    target: "_blank",
    href: "https://github.com/rubenanlo",
    component: GitHubIcon,
    icon: true,
  },
  {
    label: "LinkedIn",
    target: "_blank",
    href: "https://www.linkedin.com/in/ruben-andino/",
    component: LinkedInIcon,
    icon: true,
  },
  {
    label: "Contact me",
    href: "mailto:randinocv@gmail.com",
    component: Button as React.ComponentType<{
      className?: string;
      children?: React.ReactNode;
    }>,
    icon: false,
    text: "Contact me",
  },
];
