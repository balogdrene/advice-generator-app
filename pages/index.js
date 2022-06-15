import { useState } from "react"
import Head from "next/head"
import Image from "next/image"
import divider from "../public/pattern-divider-desktop.svg"

export default function Home({ initialAdvice }) {
  const [advice, setAdvice] = useState(initialAdvice)
  const fetchData = async () => {
    const req = await fetch("https://api.adviceslip.com/advice")
    const newData = await req.json()

    return setAdvice(newData)
  }

  const handleClick = (event) => {
    event.preventDefault()
    fetchData()
  }

  return (
    <div className="h-screen font-extrabold bg-darkBlue font-manrope">
      <Head>
        <title>Advice generator app</title>
        <meta
          name="description"
          content="The perfect project if you're learning how to interact with 3rd-party APIs. This challenge uses the Advice Slip API to generate random quotes of advice."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex items-center justify-center h-full h-screen">
        <div className="relative flex flex-col items-center p-5 text-center rounded-lg shadow-2xl justify-evenly bg-darkGrayishBlue w-96 h-96">
          <h1 className="text-neonGreen">Advice #{advice.slip.id}</h1>
          <div className="flex items-center justify-center h-40">
            <p className="text-2xl text-white">"{advice.slip.advice}"</p>
          </div>
          <Image src={divider} alt="" />
          <button
            onClick={handleClick}
            className="absolute bottom-0 p-5 translate-y-1/2 rounded-full bg-slate-400"
          >
            Generate Random
          </button>
        </div>
      </main>
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch("https://api.adviceslip.com/advice")
  const data = await res.json()

  return {
    props: { initialAdvice: data },
  }
}
