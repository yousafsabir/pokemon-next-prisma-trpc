import Head from "next/head";
import { Inter, Open_Sans } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Head>
                <title>Roundest Pokemon | Home page</title>
                <meta name="description" content="roundest pokemon" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={"min-h-screen w-full grid place-content-center"}>
                <div className="space-y-6 p-8">
                    <h1 className="font-bold text-4xl text-center">
                        Which Pokemon is the roundest
                    </h1>
                    <div className="border rounded p-8">
                        <div className="flex space-x-5 items-center">
                            <img
                                src="https://placeimg.com/800/200/arch"
                                alt=""
                                className="rounded-lg object-cover object-center w-56 h-56 cursor-pointer"
                            />
                            <span>Vs</span>
                            <img
                                src="https://placeimg.com/800/200/arch"
                                alt=""
                                className="rounded-lg object-cover object-center w-56 h-56 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
