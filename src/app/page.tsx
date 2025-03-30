"use client";

import WidgetCanvas from "@/components/WidgetCanvas/WidegetCanvas";
import {useState} from "react";
import styles from "@/app/page.module.css";
import {Widget} from "@/types/widget";

export default function Home() {
  const [widgets, setWidgets] = useState<Widget[]>([])

  return (
    <div className={styles.pageWrapper}>
      <WidgetCanvas widgets={widgets} />
    </div>
  );
}
