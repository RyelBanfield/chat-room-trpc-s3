import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import FormInputs from "~/components/FormInputs";
import Header from "~/components/Header";
import ImagePreview from "~/components/ImagePreview";
import Messages from "~/components/Messages";

const Home: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <Head>
        <title>Chat Room TRPC-S3</title>
        <meta name="description" content="Built by Ryel Banfield" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col bg-neutral-900 text-neutral-100 antialiased">
        <Header />
        <main className="container mx-auto flex flex-grow flex-col p-6">
          <Messages />
          <ImagePreview file={file} setFile={setFile} />
          <FormInputs file={file} setFile={setFile} />
        </main>
      </div>
    </>
  );
};

export default Home;
