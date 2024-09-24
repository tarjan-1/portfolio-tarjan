import {Suspense, useState} from 'react'
import {myProjects} from "../constants/index.js";
import {Canvas} from "@react-three/fiber";
import CanvasLoader from "../components/CanvasLoader.jsx";
import {Center, OrbitControls} from "@react-three/drei";
import DemoComputer from "../components/DemoComputer.jsx";

const Projects = () => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
    const currProject = myProjects[selectedProjectIndex];
    const projectCount = myProjects.length

    const handleNavigation = (direction) => {
        setSelectedProjectIndex((previndex) => {
            if (direction === "previous") {
                return previndex === 0 ? projectCount - 1 : previndex - 1
            }else {
                return previndex === projectCount - 1 ? 0 : previndex + 1
            }
        })

    }

    return (
        <section className="c-space my-20">
            <div className="head-text">My Work</div>
            <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
                <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
                    <div className="absolute top-0 right-0">
                        <img src={currProject.spotlight} alt="spotlight"  className="w-full h-96 object-cover rounded-xl"/>
                    </div>
                    <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currProject.logoStyle}>
                        <img src={currProject.logo} alt="logo" className="w-10 h-10 shadow-sm"/>
                    </div>
                    <div className="flex flex-col gap-5 text-white-600 my-5">
                        <p className="text-white text-2xl font-semibold animatedText">{currProject.title}</p>
                        <p className="animatedText">{currProject.desc}</p>
                        <p className="animatedText">{currProject.subdesc}</p>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-5">
                        <div className="flex items-center gap-3">
                            {currProject.tags.map((tag, index) => (
                                <div key={index} className="tech-logo">
                                    <img src={tag.path} alt={tag.name} className="w-10 h-10"/>
                                </div>
                            ))}
                        </div>
                        <a className="flex items-center gap-2 cursor-pointer text-white-600" href={currProject.href} target="_blank" rel='noreferrer'>
                            <p>Check Live Site</p>
                            <img src="assets/arrow-up.png" alt="arrow" className="w-3 h-3"/>
                        </a>
                    </div>

                    <div className="flex justify-between items-center mt-7">
                        <button className="arrow-btn" onClick={() => {
                            handleNavigation('previous')
                        }}>
                            <img src="/assets/left-arrow.png" alt="arrow" className="w-4 h-4"/>
                        </button>
                        <button className="arrow-btn" onClick={() => {
                            handleNavigation('next')
                        }}>
                            <img src="assets/right-arrow.png" alt="arrow" className="w-4 h-4"/>
                        </button>
                    </div>
                </div>

                <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
                    <Canvas>
                        <ambientLight intensity={Math.PI} />
                        <directionalLight position={[10, 10, 5]} />
                        <Center>
                            <Suspense fallback={<CanvasLoader />}>
                                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                                    <DemoComputer texture={currProject.texture} />
                                </group>
                            </Suspense>
                        </Center>
                    <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
                    </Canvas>
                </div>

            </div>
        </section>
    )
}
export default Projects
