import Head from "next/head";

export default function Seo({ title }: any) {
  return (
    <Head>
      <title>{title} | leave,live</title>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width, maximum-scale-1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi"
      />
    </Head>
  );
}
