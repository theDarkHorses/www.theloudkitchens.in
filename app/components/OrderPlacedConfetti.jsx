"use client"

import React, { useCallback, useEffect, useRef } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";

const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
};

export default function OrderPlacedConfetti({ id, discount }) {
    const refAnimationInstance = useRef(null);

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
            refAnimationInstance.current({
                ...opts,
                origin: { y: 0.7 },
                particleCount: Math.floor(200 * particleRatio)
            });
    }, []);

    const fire = useCallback(() => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55
        });

        makeShot(0.2, {
            spread: 60
        });

        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45
        });
    }, [makeShot]);

    useEffect(() => {
        fire()
    }, [])

    return (
        <div className="h-screen w-screen overflow-hidden flex items-center justify-center p-5   backdrop-opacity-[0.77] backdrop-blur-sm fixed top-0 left-0 right-0 bottom-0 z-[99999999]">
            <div className=" mx-5 rounded-2xl border min-w-[300px] flex items-center flex-col bg-white justify-center pt-4 space-y-2 divide-dashed divide-y text-[#636989] divide-[#9BA1C1] " style={{ boxShadow: "0px 4px 14px 0px #00000024" }}>
                <div className="flex items-center justify-center flex-col  py-8 ">
                    <p className="text-lg text-primary font-bold font-raleway">ORDER PLACED!!</p>
                    <p className="font-medium font-lato text-lg px-5 mt-2  text-center">Deliciousness will get delivered right to your doorstep.</p>
                </div>
                <p className="font-lato font-medium text-lg text-[#AC2323] w-full text-center py-2">woah. Thanks!!!!</p>
            </div>
            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
        </div>
    )
}
