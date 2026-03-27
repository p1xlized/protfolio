'use client';
import { Button } from "@portfolio/ui/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/about")({ component: About });


export default function About() {
  return (
    <div>
      <h1 className="text-primary text-2xl">About</h1>
      <Button variant="outline" onClick={() => console.log("Click worked!")}>
        teeest
      </Button>
    </div>
  );
}
