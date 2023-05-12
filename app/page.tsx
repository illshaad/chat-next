"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGlobalContext } from "./Context/store";

type Inputs = {
  username: string;
  secret: string;
};

export default function Home() {
  const router = useRouter();
  const { setUserName, setSecret } = useGlobalContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const { username, secret } = data;
    if (username && secret) {
      setUserName(username);
      setSecret(secret);

      try {
        const response = await fetch("https://api.chatengine.io/users/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Private-key": "f12eef51-cffc-432d-8751-9a76f4ae53ad",
          },

          body: JSON.stringify({ username, secret }),
        });
        if (response) {
          console.log(response);

          router.push("/chat");
        }
      } catch (error) {
        console.log(error, "erreur ici");
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-blue-900 h-screen">
      <div className="bg-white shadow-md p-6 rounded-lg h-98">
        <h2 className="text-2xl text-center text-zinc-700 p-4">
          Venez chatter avec nous !
        </h2>
        <p className="text-base text-zinc-700 p-4 mb-4">
          Besoin email et mots de passe pour commencer
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <input
              {...register("username", { required: true })}
              type="text"
              placeholder="*email"
              className="border-b border-gray-300 px-4 py-2 text-zinc-700 hover:border-blue-500 focus:border-blue-500 outline-none"
            />
            {errors.username && (
              <span className="text-red-500 text-sm text-center">
                Oup j'ai besoin d'un email
              </span>
            )}

            <input
              {...register("secret", { required: true })}
              type="password"
              placeholder="*mots de passe"
              className="border-b border-gray-300 px-4 py-2 text-zinc-700 hover:border-blue-500 focus:border-blue-500 outline-none"
            />
            {errors.secret && (
              <span className="text-red-500 text-sm text-center ">
                Oup j'ai besoin d'un mots de passe
              </span>
            )}
          </div>

          <div className="flex justify-center my-4">
            <button
              type="submit"
              className="bg-blue-900 text-white font-bold py-2 px-4 rounded-md shadow-lg mt-4"
            >
              Cliquez ici
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
