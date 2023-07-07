"use client";
import { enUS, jaJP } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";
import clsx from "clsx";
import { useEffect, useState, useMemo } from "react";

export default function CustomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState("en");

  const handleChangeLanguage = (lang: string) => () => {
    setLanguage(lang);
  };

  useEffect(() => {
    console.log(`Current language: ${language}`);
  }, [language]);

  const localization = useMemo(
    () => (language === "en" ? enUS : jaJP),
    [language]
  );

  return (
    <ClerkProvider localization={localization}>
      <>
        <div className="fixed inset-x-0 flex flex-row justify-center gap-4 lg:gap-6 xl:gap-8 p-4">
          <button
            className={clsx("hover:text-blue-500", {
              "text-blue-500 font-bold": language === "en",
            })}
            onClick={handleChangeLanguage("en")}
          >
            English
          </button>
          <button
            className={clsx("hover:text-blue-500", {
              "text-blue-500 font-bold": language === "ja",
            })}
            onClick={handleChangeLanguage("ja")}
          >
            Japanese
          </button>
        </div>

        {children}
      </>
    </ClerkProvider>
  );
}
