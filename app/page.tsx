"use client"
import { Canvas } from "@react-three/fiber"
import { useEffect, useState } from "react";
import Image from "next/legacy/image";
import Link from "next/link";

export default function Home() {
  const [squareXPosition, setSquareXPosition] = useState<number>(-10);
  const [squareYPosition, setSquareYPosition] = useState<number>(5);
  const [sojoImage, setSojoImage] = useState<boolean>(false);

  // Loading...
  useEffect(() => {
    const interval = setInterval(() => {
      setSquareXPosition(squareXPosition + 1)
      if (squareXPosition === 10) {
        setSquareXPosition(-10);
        setSquareYPosition(squareYPosition - 1);
      }

      if (squareYPosition === -5) {
        setSojoImage(true);
      }
    }, 100);

    return () => clearInterval(interval);
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-24 font-mono">
      <h1 className="text-4xl pb-24">Sojo World</h1>
      <p className="text-xl pb-24">
        Development in progress. In the meantime, follow the
        {
          sojoImage 
            ? 
              <Link className="text-blue-600" href="https://twitter.com/freshsojo"> Sojo</Link> 
            : <span className="text-blue-600"> blue</span>
        }
        {" :)"}
      </p>
      {
        sojoImage
          ?
            <Image 
              src={'/futuresojo.png'}
              height={300}
              width={300}
              blurDataURL="/futuresojo.png"
              placeholder="blur"
              alt={""}
            />
          :
            <Canvas>
              <directionalLight color="blue" position={[0, 0, 5]} />
              <mesh position={[squareXPosition, squareYPosition, 0]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial />
              </mesh>
            </Canvas>
      }
    </main>
  )
}
