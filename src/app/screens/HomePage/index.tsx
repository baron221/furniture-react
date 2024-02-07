import React from "react";
import { Container } from "@mui/material";
import { Category } from "./category";
import { NewArrival } from "./newArrival";
import { Features } from "./features";
import { Sale } from "./sale";

export function HomePage() {
  return (
    <div className="homepage">
      <Category />
      <NewArrival />
      <Features/>
      <Sale/>
    </div>
  );
}
