"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const NotFoundpage = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center w-full h-svh">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            src="/assets/not_found.webp"
            width={150}
            height={30}
            alt="not found"
          />
          <p className="text-white">Ops... Página não encontrada</p>
        </div>

        <p
          onClick={() => router.push("/")}
          className="text-sm underline text-gray-400 cursor-pointer"
        >
          Ir para o inicio
        </p>
      </div>
    </div>
  );
};

export default NotFoundpage;
