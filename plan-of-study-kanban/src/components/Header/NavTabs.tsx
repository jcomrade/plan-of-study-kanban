"use client";
import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import styles from "@/styles/global.module.scss";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    text: {
      primary: "#90CAF9 ",
      secondary: "#6A6A6A",
    },
  },
});

function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

interface LinkTabProps {
  label?: string;
  href: string;
  selected?: boolean;
}

function LinkTab(props: LinkTabProps) {
  return (
    <ThemeProvider theme={theme}>
      <Link href={props.href} passHref legacyBehavior>
        <Tab
          component="a"
          onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            if (!samePageLinkNavigation(event)) {
              event.preventDefault();
            }
          }}
          aria-current={props.selected ? "page" : undefined}
          sx={{
            fontWeight: "bold", // Bold for selected tab
            color: props.selected ? "#90CAF9" : "#6A6A6A", // Font color based on selection
          }}
          {...props}
        />
      </Link>
    </ThemeProvider>
  );
}

export default function NavTabs() {
  const pathname = usePathname();
  const [value, setValue] = React.useState(() => {
    switch (pathname.split("/").pop()) {
      case "plan":
        return 0;
      case "draft":
        return 1;
      case "curriculum":
        return 2;
      default:
        return 0;
    }
  });
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (event.type !== "click" || samePageLinkNavigation(event as any)) {
      setValue(newValue);
    }
  };

  return (
    <Box className={styles.navBar}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
      >
        <LinkTab label="Your Plan" href="/studyplan/2021-06005/plan" />
        <LinkTab label="Draft" href="/studyplan/2021-06005/draft" />
        <LinkTab label="Curriculum" href="/studyplan/2021-06005/curriculum" />
      </Tabs>
    </Box>
  );
}
