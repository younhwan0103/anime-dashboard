"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimeFlip } from "./anime-flip";
import { MotionLayout } from "./motion-layout";
import { ViewTransition } from "./view-transition";

export function LayoutTransitionDemo() {
  return (
    <Tabs defaultValue="motion">
      <TabsList>
        <TabsTrigger value="motion">motion</TabsTrigger>
        <TabsTrigger value="vt">View Transitions</TabsTrigger>
        <TabsTrigger value="anime">Anime.js FLIP</TabsTrigger>
      </TabsList>

      <TabsContent value="motion">
        <MotionLayout />
      </TabsContent>
      <TabsContent value="vt">
        <ViewTransition />
      </TabsContent>
      <TabsContent value="anime">
        <AnimeFlip />
      </TabsContent>
    </Tabs>
  );
}
