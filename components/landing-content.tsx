"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Ratan Kumar Baidya",
    avatar: "J",
    title: "For Any help",
    address1: "Barnch Manager, ",
    address2: "Gournadi Branch, Barishal.",
  },
  {
    name: "Ratan Kumar Baidya",
    avatar: "A",
    title: "Developed By",
    address1: "Barnch Manager, ",
    address2: "Gournadi Branch, Barishal.",
  },
  {
    name: "Md. Akter Hossain",
    avatar: "M",
    title: "Instruction",
    address1: "SPO, ",
    address2: "Head Office, Dhaka.",
  },
  {
    name: "Salma Banu",
    avatar: "M",
    title: "In Gratitude ",
    address1: "Managing Director, ",
    address2: "Head Office, Dhaka.",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Contribution</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.address1} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                <p className="text-zinc-400 text-sm">{item.title}</p>
                  <p className="text-lg">{item.name}</p>
                 
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.address1}
                {item.address2}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
