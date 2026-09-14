import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { buildPageMetadata } from "@/lib/metadata";
import { bookingHref } from "@/lib/site";

const path = "/book";

export const metadata: Metadata = buildPageMetadata({
  title: "Book Mobile Tyre Fitting Online",
  description:
    "Book Duke Street Tyres mobile fitting online through the live shared booking platform.",
  path,
});

export default function BookPage() {
  redirect(bookingHref());
}
